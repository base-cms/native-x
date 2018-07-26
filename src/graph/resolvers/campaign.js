const { paginationResolvers } = require('@limit0/mongoose-graphql-pagination');
const Advertiser = require('../../models/advertiser');
const CreativeService = require('../../services/campaign-creatives');
const Campaign = require('../../models/campaign');
const Story = require('../../models/story');
const Contact = require('../../models/contact');
const Image = require('../../models/image');
const Placement = require('../../models/placement');
const contactNotifier = require('../../services/contact-notifier');

const getNotifyDefaults = async (advertiserId, user) => {
  const advertiser = await Advertiser.strictFindById(advertiserId);
  const notify = {
    internal: await advertiser.get('notify.internal'),
    external: await advertiser.get('notify.external'),
  };
  const contact = await Contact.getOrCreateFor(user);
  notify.internal.push(contact.id);
  return notify;
};

module.exports = {
  /**
   *
   */
  Campaign: {
    advertiser: campaign => Advertiser.findById(campaign.advertiserId),
    notify: async (campaign) => {
      const internal = await Contact.find({ _id: { $in: campaign.notify.internal } });
      const external = await Contact.find({ _id: { $in: campaign.notify.external } });
      return { internal, external };
    },
    hash: campaign => campaign.pushId,
    story: campaign => Story.findById(campaign.storyId),
  },

  CampaignCriteria: {
    placements: criteria => Placement.find({ _id: criteria.get('placementIds') }),
  },

  CampaignCreative: {
    image: creative => Image.findById(creative.imageId),
  },

  /**
   *
   */
  CampaignConnection: paginationResolvers.connection,

  /**
   *
   */
  Query: {
    /**
     *
     */
    campaign: (root, { input }, { auth }) => {
      auth.check();
      const { id } = input;
      return Campaign.strictFindActiveById(id);
    },

    /**
     *
     */
    campaignCreative: (root, { input }, { auth }) => {
      const { campaignId, creativeId } = input;
      auth.checkCampaignAccess(campaignId);
      return CreativeService.findFor(campaignId, creativeId);
    },

    /**
     *
     */
    campaignHash: (root, { input }) => {
      const { advertiserId, hash } = input;
      return Campaign.strictFindActiveOne({ advertiserId, pushId: hash });
    },

    /**
     *
     */
    allCampaigns: (root, { pagination, sort }, { auth }) => {
      auth.check();
      const criteria = { deleted: false };
      return Campaign.paginate({ criteria, pagination, sort });
    },

    /**
     *
     */
    searchCampaigns: (root, { pagination, phrase }, { auth }) => {
      auth.check();
      const filter = { term: { deleted: false } };
      return Campaign.search(phrase, { pagination, filter });
    },
  },

  /**
   *
   */
  Mutation: {
    /**
     *
     */
    createCampaign: async (root, { input }, { auth }) => {
      auth.check();
      const { payload } = input;
      payload.criteria = { start: payload.startDate };
      payload.notify = await getNotifyDefaults(payload.advertiserId, auth.user);
      const campaign = await Campaign.create(payload);
      contactNotifier.sendInternalCampaignCreated({ campaign });
      contactNotifier.sendExternalCampaignCreated({ campaign });
      return campaign;
    },

    createExternalUrlCampaign: async (root, { input }, { auth }) => {
      auth.check();
      const { name, advertiserId, startDate } = input;
      const notify = await getNotifyDefaults(advertiserId, auth.user);

      const campaign = await Campaign.create({
        name,
        advertiserId,
        criteria: { start: startDate },
        notify,
      });

      contactNotifier.sendInternalCampaignCreated({ campaign });
      contactNotifier.sendExternalCampaignCreated({ campaign });
      return campaign;
    },

    createExistingStoryCampaign: async (root, { input }, { auth }) => {
      auth.check();
      const { name, storyId, startDate } = input;
      const story = await Story.strictFindActiveById(storyId, { _id: 1, advertiserId: 1 });

      const { advertiserId } = story;
      const notify = await getNotifyDefaults(advertiserId, auth.user);

      const campaign = await Campaign.create({
        name,
        advertiserId,
        storyId,
        criteria: { start: startDate },
        notify,
      });

      contactNotifier.sendInternalCampaignCreated({ campaign });
      contactNotifier.sendExternalCampaignCreated({ campaign });
      return campaign;
    },

    createNewStoryCampaign: async (root, { input }, { auth }) => {
      auth.check();
      const { user } = auth;
      const { name, advertiserId, startDate } = input;
      const notify = await getNotifyDefaults(advertiserId, auth.user);

      const story = await Story.create({
        title: 'Placeholder Story',
        advertiserId,
        placeholder: true,
        updatedById: user.id,
        createdById: user.id,
      });

      const campaign = await Campaign.create({
        name,
        storyId: story.id,
        advertiserId,
        criteria: { start: startDate },
        notify,
      });

      contactNotifier.sendInternalCampaignCreated({ campaign });
      contactNotifier.sendExternalCampaignCreated({ campaign });
      return campaign;
    },

    /**
     *
     */
    updateCampaign: async (root, { input }, { auth }) => {
      auth.check();
      const { id, payload } = input;
      const campaign = await Campaign.strictFindActiveById(id);
      campaign.set(payload);
      return campaign.save();
    },

    assignCampaignValue: async (root, { input }) => {
      const { id, field, value } = input;
      const campaign = await Campaign.strictFindActiveById(id);
      campaign.set(field, value);
      return campaign.save();
    },

    /**
     *
     */
    campaignCriteria: async (root, { input }, { auth }) => {
      auth.check();
      const { campaignId, payload } = input;
      const campaign = await Campaign.strictFindActiveById(campaignId);
      campaign.criteria = payload;
      await campaign.save();
      return campaign.criteria;
    },

    campaignUrl: async (root, { input }, { auth }) => {
      const { campaignId, url } = input;
      auth.checkCampaignAccess(campaignId);
      const campaign = await Campaign.strictFindActiveById(campaignId);
      campaign.url = url;
      return campaign.save();
    },

    /**
     *
     */
    addCampaignCreative: (root, { input }, { auth }) => {
      const { campaignId, payload } = input;
      auth.checkCampaignAccess(campaignId);
      return CreativeService.createFor(campaignId, payload);
    },

    /**
     *
     */
    removeCampaignCreative: async (root, { input }, { auth }) => {
      const { campaignId, creativeId } = input;
      auth.checkCampaignAccess(campaignId);
      await CreativeService.removeFrom(campaignId, creativeId);
      return 'ok';
    },

    /**
     *
     */
    campaignCreativeStatus: async (root, { input }, { auth }) => {
      auth.check();
      const { campaignId, creativeId, status } = input;
      return CreativeService.setStatusFor(campaignId, creativeId, status);
    },

    /**
     *
     */
    campaignCreativeDetails: async (root, { input }, { auth }) => {
      const { campaignId, creativeId, payload } = input;
      auth.checkCampaignAccess(campaignId);
      const { title, teaser, status } = payload;
      return CreativeService.updateDetailsFor(campaignId, creativeId, { title, teaser, status });
    },

    /**
     *
     */
    campaignCreativeImage: async (root, { input }, { auth }) => {
      const { campaignId, creativeId, imageId } = input;
      auth.checkCampaignAccess(campaignId);
      return CreativeService.updateImageFor(campaignId, creativeId, imageId);
    },

    /**
     *
     */
    campaignContacts: async (root, { input }, { auth }) => {
      auth.check();
      const { id, type, contactIds } = input;
      const field = `notify.${type}`;
      const campaign = await Campaign.strictFindActiveById(id);
      campaign.set(field, contactIds);
      return campaign.save();
    },
  },
};
