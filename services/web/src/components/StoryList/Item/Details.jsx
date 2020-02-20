import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const StoryListItemDetails = ({
  title,
  teaser,
  advertiser,
  publishedAt,
}) => (
  <div className="d-flex flex-column">
    <h5 className="mb-2">
      {title}
    </h5>
    <h6 className="mb-0">
      From:
      {' '}
      {advertiser.name}
    </h6>
    {teaser && teaser.length > 0 && (
    <p className="mt-1 mb-0 text-muted">
      {teaser}
    </p>
    )}
    {publishedAt
      && (
        <small className="mt-auto">
          Published:
          {' '}
          <Moment format="MMM Do, YYYY">
            {publishedAt}
          </Moment>
        </small>
      )
    }

  </div>
);

StoryListItemDetails.defaultProps = {
  teaser: '',
  publishedAt: null,
};

StoryListItemDetails.propTypes = {
  title: PropTypes.string.isRequired,
  teaser: PropTypes.string,
  advertiser: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  publishedAt: PropTypes.number,
};

export default StoryListItemDetails;
