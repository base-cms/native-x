import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import gql from 'graphql-tag';
import {
  Row,
  Col,
  Container,
  Card,
  CardTitle,
  CardSubtitle,
  CardImgOverlay,
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

const createMarkup = html => ({ __html: html });

const publisher = {'name':'Firehouse'};

const Story = ({ id }) => {
  const input = { id };
  return (
    <PageWrapper>
      <Row>
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
              <div>
                <Head>
                  <title>{story.title}</title>
                  <meta name="description" story={story.teaser} />
                </Head>
                {/* <Imgix tag="div" className="img-fluid" src={story.primaryImage.src} alt={story.primaryImage.caption} title={story.title} w="1200" h="600" fit="crop" crop="faces,edges">
                  <Container>
                    <Row>
                      <div className="col-lg-8 col-md-10 mx-auto">
                        <div className="post-heading">
                          <h1>{story.title}</h1>
                        </div>
                      </div>
                    </Row>
                  </Container>
                </Imgix> */}
                <div>
                  <Imgix className="img-fluid" src={story.primaryImage.src} alt={story.primaryImage.caption} title={story.title} w="1200" h="600" fit="crop" crop="faces,edges"/>
                  <CardImgOverlay className="d-flex">
                    <Col className="my-auto mx-auto text-center">
                      <CardTitle tag="h1" className="text-light" style={{ textShadow: '1px 1px 8px rgba(0, 0, 0, 1)' }}>{story.title}</CardTitle>
                      <CardSubtitle tag="h6" className="text-light" style={{ textShadow: '1px 1px 8px rgba(0, 0, 0, 1)' }}>by {story.advertiser.name}</CardSubtitle>
                    </Col>
                  </CardImgOverlay>
                </div>
                <Container id="story-body" className="shadow-lg p-3 mb-5 bg-white rounded">
                  {/* eslint-disable-next-line react/no-danger */}
                  <div dangerouslySetInnerHTML={createMarkup(story.body)} />
                </Container>
                
              </div>
            );
          }}
        </Query>
      </Row>
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
