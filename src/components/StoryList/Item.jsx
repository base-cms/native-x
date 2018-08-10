import React from 'react';
import PropTypes from 'prop-types';
import { ListGroupItem } from 'reactstrap';
import Link from 'next/link';
import PrimaryImage from './Item/PrimaryImage';
import Details from './Item/Details';

const StoryListItem = ({
  id,
  path,
  title,
  teaser,
  primaryImage,
  advertiser,
  publishedAt,
}) => (
  <Link as={`/story/${path}`} href={`/story?id=${id}`} passHref>
    <ListGroupItem tag="a" href="#" className="flex-column align-items-start" action>
      <div className="d-flex flex-row justify-content-between">
        <div className="d-flex flex-row">
          {primaryImage && primaryImage.src
            && <PrimaryImage src={primaryImage.src} {...primaryImage.focalPoint} />
          }
          <Details
            title={title}
            teaser={teaser}
            advertiser={advertiser}
            publishedAt={publishedAt}
          />
        </div>
      </div>
    </ListGroupItem>
  </Link>
);

StoryListItem.defaultProps = {
  teaser: '',
  publishedAt: null,
  primaryImage: {},
};

StoryListItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  teaser: PropTypes.string,
  publishedAt: PropTypes.number,
  advertiser: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  primaryImage: PropTypes.shape({
    src: PropTypes.string,
    focalPoint: PropTypes.shape({
      x: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      y: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  }),
};

export default StoryListItem;
