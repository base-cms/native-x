import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import gql from 'graphql-tag';
import {
  Row,
  Container,
} from 'reactstrap';
import { Query } from 'react-apollo';
import PageWrapper from '../components/PageWrapper';
import Imgix from '../components/Imgix';
import withApollo from '../apollo/client';

const STORY = gql`
  query Story($input: ModelIdInput!) {
    story(input: $input) {
      id
      title
      teaser
      body
      primaryImage {
        src
      }
      advertiser {
        id
        name
      }
    }
  }
`;
// const coverImageBackground = {
//   height: '80vh',
//   background: 'url() center/cover no-repeat fixed',
// };

// const teaser = {
//   lineHeight: '1.5em',
//   fontStyle: 'italic',

// };

// const Styles =  {
//   coverImageBackground: coverImageBackground,
//   teaser: teaser,
// };

const createMarkup = html => ({ __html: html });

const Story = ({ id }) => {
  const input = { id };
  return (
    <PageWrapper>
      <style jsx global>{`
      * {
        max-width: 100%
      }
      nav.navbar.fixed-top + * {
        margin-top: 80px;
      }
      a.card-title {
        color: white;
      }
      div.story-header {
        background-color: #000;
      }
      div.story-header > div {
        max-width:1700px;
        margin: 0 auto;
      }
      div.bg-imgIx {
        height: 80vh;
        background: url() center/cover no-repeat fixed;
      }
      div.bg-imgIx .container {
        position: relative;
        top: 20vh
      }

      div.bg-imgIx:before {
        backgound: transparent
        transition: background 0.5s linear;
      }

      div#story-body {
        background: -moz-linear-gradient(top, rgba(0,0,0,0.0) 0%, rgba(0,0,0,1) 10vh, rgba(255,255,255,0.0) 10px); /* FF3.6-15 */
        background: -webkit-linear-gradient(top, rgba(0,0,0,0.0) 0%, rgba(0,0,0,1) 10vh, rgba(255,255,255,0.0) 10px); /* Chrome10-25,Safari5.1-6 */
        background: linear-gradient(to bottom, rgba(0,0,0,0.0) 0%, rgba(0,0,0,1) 10vh, rgba(255,255,255,0.0) 10px); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#00ffffff',GradientType=1 ); /* IE6-9 */
      }

      div.bg-imgIx:before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background:rgba(0,0,0,0.25);
        -webkit-transition: background 1.5s ease-out;
        -moz-transition: background 1.5s ease-out;
        -o-transition: background 1.5s ease-out;
        transition: background 1.5s ease-out;
      }

      @media screen and (min-width: 1600px) {
        div.bg-imgIx:before {
          background: -moz-linear-gradient(left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.25) 300px, rgba(0,0,0,0.25) calc(100% - 300px), rgba(0,0,0,1) 100%); /* FF3.6-15 */
          background: -webkit-linear-gradient(left, rgba(0,0,0,1) 0%,rgba(0,0,0,0.25) 300px,rgba(0,0,0,0.25) calc(100% - 300px),rgba(0,0,0,1) 100%); /* Chrome10-25,Safari5.1-6 */
          background: linear-gradient(to right, rgba(0,0,0,1) 0%,rgba(0,0,0,0.25) 300px,rgba(0,0,0,0.25) calc(100% - 300px),rgba(0,0,0,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
          filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#00ffffff',GradientType=1 ); /* IE6-9 */
        }
      }

      // .story-header.container {
      //   position: absolute;
      //   bottom: 0;
      //   left: 0;
      //   width: 100%;
      //   padding: 20px 10px;
      //   background: inherit;
      //   background-attachment: fixed;
      // }
      // .story-header.container::before {
      //   content: "";
      //   position: absolute;
      //   top: 0;
      //   left: 0;
      //   width: 100%;
      //   height: 100%;
      //   background: inherit;
      //   background-color: rgba(0,0,0, .5);
      //   background-attachment: fixed;
      //   -webkit-filter: blur(12px);
      //   filter: blur(12px);
      // }

      // .post-heading h1 {
      //   background-color: #fff;
      //   -webkit-background-clip: text;
      //   text-shadow: rgba(0,0,0,0.95) 0px 7px 5px;
      // }

      .post-heading h1 {
        text-shadow: -3px -3px 3px rgba(0,0,0,.5), 3px 3px 3px #000;
        color: #fff;
        font-size: 7vw;
      }


      #story-body > .container {
        margin-top: -10vh;

      }
    `}</style>
      <Query query={STORY} variables={{ input }}>
        {({ loading, error, data }) => {
          if (loading) {
            return (
              <p>Loading...</p>
            );
          }
          if (error) return <p><strong>{error.message}</strong></p>;

          const { story } = data;

          return (
            <div className="story-wrapper">
              <div className="story-header">
                <Head>
                  <title>{story.title}</title>
                  <meta name="description" story={story.teaser} />
                </Head>
                <Imgix tag="div" className="position-relative bg-imgIx img-fluid" src={story.primaryImage.src} alt={story.primaryImage.caption} title={story.title} w="1200" h="600" fit="crop" crop="faces,edges">
                  <Container className="story-title">
                    <Row className="mt-5">
                      <div className="col-lg-8 col-md-10 mx-auto text-white p-3">
                        <div className="post-heading">
                          <h1 className="display-1 text-xs-center">{story.title}</h1>
                        </div>
                      </div>
                    </Row>
                  </Container>
                </Imgix>
              </div>
              <div id="story-body" className="position-relative">
                <Container className="shadow-lg p-3 mb-5 bg-white rounded">
                  <h2 className="mt-1 mb-4 font-italic">
                    {story.teaser}
                  </h2>
                  {/* eslint-disable-next-line react/no-danger */}
                  <div className="fr-view" dangerouslySetInnerHTML={createMarkup(story.body)} />
                </Container>
              </div>
            </div>
          );
        }}
      </Query>
    </PageWrapper>
  );
};

Story.getInitialProps = async ({ query }) => {
  const { id } = query;
  return { id };
};

Story.propTypes = {
  id: PropTypes.string.isRequired,
};

export default withApollo(Story);
