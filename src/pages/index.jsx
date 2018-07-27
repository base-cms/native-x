import React from 'react';
import { Query } from 'react-apollo';
import {
  Row,
  Col,
  Card,
  CardTitle,
  CardImgOverlay,
  CardSubtitle,
  Container,
} from 'reactstrap';
import Link from 'next/link';
import Head from 'next/head';
import Imgix from '../components/Imgix';
import PageWrapper from '../components/PageWrapper';
import withApollo from '../apollo/client';
import query from '../gql/all-stories.graphql';

const Index = () => {
  const input = { pagination: { first: 10 } };
  return (
    <PageWrapper>
      <Container className="mt-5">
        <Head>
          <title>Homepage</title>
        </Head>

        <Row>
          <Col>
            <Card className="border-0 p-5">
              <Query query={query} variables={{ input }}>
                {({ loading, error, data }) => {
                  if (loading) return <p>Loading...</p>;
                  if (error) return <p><strong>{error.message}</strong></p>;

                  const { allStories } = data;

                  return (
                    <div className="card-columns">
                      {allStories.edges.map(edge => (
                        <Card key={edge.node.id}>
                          <Imgix className="card-img" src={edge.node.primaryImage.src} title={edge.node.title} w="300" h="300" fit="crop" crop="faces,edges" />
                          <CardImgOverlay className="d-flex align-items-end" style={{ background: 'linear-gradient(to top, #000000bf, #0000)' }}>
                            <Col className="px-1">
                              <Link key={edge.node.id} as={`/story/${edge.node.id}`} href={`/story/${edge.node.id}`} passHref>
                                <CardTitle tag="a">{edge.node.title}</CardTitle>
                              </Link>
                              <CardSubtitle>{edge.node.advertiser.name}</CardSubtitle>
                            </Col>
                          </CardImgOverlay>
                        </Card>
                      ))}
                    </div>
                  );
                }}
              </Query>
            </Card>
          </Col>
        </Row>
      </Container>
    </PageWrapper>
  );
};

export default withApollo(Index);
