import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import gql from 'graphql-tag';
import {
  Row,
  Col,
  Card,
  CardTitle,
  CardBody,
} from 'reactstrap';
import { Query } from 'react-apollo';
import withApollo from '../apollo/client';

const STORY = gql`
  query Story($input: ModelIdInput!) {
    story(input: $input) {
      id
      title
      teaser
      body
    }
  }
`;

const createMarkup = html => ({ __html: html });

const Story = ({ id }) => {
  const input = { id };
  return (
    <Row>
      <Col>
        <Card>
          <Query query={STORY} variables={{ input }}>
            {({ loading, error, data }) => {
              if (loading) {
                return (
                  <CardBody>
                    <p>Loading...</p>
                  </CardBody>
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
                  <CardBody>
                    <CardTitle tag="h1">{story.title}</CardTitle>
                    <h3>{story.teaser}</h3>
                    {/* eslint-disable-next-line react/no-danger */}
                    <div dangerouslySetInnerHTML={createMarkup(story.body)} />
                  </CardBody>
                </div>
              );
            }}
          </Query>
        </Card>
      </Col>
    </Row>
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
