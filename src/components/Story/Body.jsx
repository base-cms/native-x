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
        #story-body .container *{
          max-width: 100%;
        }
        
        #story-body {
          font-family: 'Raleway', sans-serif;
        }

        #story-body > .container {
          margin-top: -10vh;
        }

        #story-body h3 {
          margin-top: 2rem;
        }

        #story-body h2.teaser {
          font-size: 1.5rem;
        }

        @media screen and (max-width: 600px) {
          .fr-img-caption,
          iframe {
            min-width: 100%;
          }
        }
      `}
      </style>
      <Container className="shadow-lg p-3 mb-4 p-lg-5 bg-white rounded">
        <h2 className="mb-4 font-weight-light teaser">
          {teaser}
        </h2>
        <hr className="mt-4 mb-4" />
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
