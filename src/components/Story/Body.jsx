import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';

const Body = (props) => {
  const {
    body, teaser,
  } = props;

  const createMarkup = html => ({ __html: html });

  return (
    <div id="story-body" className="position-relative">
      <style jsx global>{`
        #story-body *{
          max-width: 100%;
        }
        #story-body {
          font-family: 'News Cycle', sans-serif;
        }

        #story-body > .container {
          margin-top: -10vh;

        }
        @media screen and (max-width: 1600px) {
          .fr-img-caption,
          iframe {
            min-width: 100%;
          }
        }
      `}
      </style>
      <Container className="shadow-lg p-3 mb-5 bg-white rounded">
        <h2 className="mt-1 mb-4 font-italic">
          {teaser}
        </h2>
        {/* eslint-disable-next-line react/no-danger */}
        <div className="fr-view" dangerouslySetInnerHTML={createMarkup(body)} />
      </Container>
    </div>
  );
};

Body.defaultProps = {
  teaser: '',
};

Body.propTypes = {
  teaser: PropTypes.string,
  body: PropTypes.string.isRequired,
};

export default Body;
