import React from 'react';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';
import Title from '../components/Title';
import TrackPageView from '../components/TrackPageView';
import StoryList from '../components/StoryList';
import { AccountConsumer } from '../providers/AccountProvider';

export default () => (
  <Container fluid>
    <Title value="Home" />
    <TrackPageView params={{ page_title: 'Home' }} />

    <Row className="my-3">
      <Col className="mx-5">
        <AccountConsumer>
          {({ account }) => {
            return (
              <h1 className="mb-0">
                {account.name}
              </h1>
            );
          }}
        </AccountConsumer>
        <hr className="mb-4" />
        <StoryList first={10} />
      </Col>
    </Row>
  </Container>
);
