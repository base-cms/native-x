import React from 'react';
import { Query } from 'react-apollo';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';
import Link from 'next/link';
import Title from '../components/Title';
import TrackPageView from '../components/TrackPageView';

import query from '../gql/queries/pages/index.graphql';

export default () => {
  const input = { pagination: { first: 10 } };
  return (
    <Container fluid>
      <Title value="Home" />
      <TrackPageView params={{ page_title: 'Home' }} />

      <Row className="mt-5">
        <Col className="mx-5">
          <Query query={query} variables={{ input }}>
            {({ loading, error, data }) => {
              if (loading) {
                return (
                  <p>
                    Loading...
                  </p>
                );
              }
              if (error) {
                return (
                  <p>
                    <strong>
                      {error.message}
                    </strong>
                  </p>
                );
              }
              const { allStories } = data;
              return (
                <div>
                  {allStories.edges.map(edge => (
                    <p key={edge.node.id}>
                      <Link as={`/story/${edge.node.id}`} href={`/story?id=${edge.node.id}`} passHref>
                        <a>
                          {edge.node.title}
                        </a>
                      </Link>
                    </p>
                  ))}
                </div>
              );
            }}
          </Query>
        </Col>
      </Row>
    </Container>
  );
};
