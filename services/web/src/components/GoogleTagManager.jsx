import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import GTM from '../lib/gtm';

/**
 * Renders the script tag for Google Tag Manager
 *
 * Adds the global, application GTM container as well as the account container (if set).
 *
 * @see https://github.com/zeit/next.js/blob/master/examples/with-google-analytics
 */
const GoogleTagManager = ({ containerIds = [] }) => {
  const script = GTM.buildScriptFor(containerIds);

  /**
   * Global GTM Tag
   *
   */
  return (
    <Fragment>
      {script && (
        <script
          dangerouslySetInnerHTML={{ // eslint-disable-line react/no-danger
            __html: script,
          }}
        />
      )}
    </Fragment>
  );
};

GoogleTagManager.defaultProps = {
  containerIds: [],
};

GoogleTagManager.propTypes = {
  containerIds: PropTypes.arrayOf(PropTypes.string),
};

export default GoogleTagManager;
