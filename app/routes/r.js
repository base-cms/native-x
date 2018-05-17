import Route from '@ember/routing/route';

export default Route.extend({

  async beforeModel({ params }) {
    const { key, hash } = params.r;
    switch (key) {
      case 'collect':
        window.location = `https://materials.fortnight.as3.io/campaign/${hash}`;
        break;

        case 'report-summary':
        window.location = `https://materials.fortnight.as3.io/report/${hash}`;
        break;

        case 'report-creative':
        window.location = `https://materials.fortnight.as3.io/reports/creative-breakdown/${hash}`;
        break;

      default:
        throw new Error(`Unknown redirect key "${key}".`);
        break;
    }
  }
});
