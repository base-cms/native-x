import React from 'react';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';
import Title from '../components/Title';
import TrackPageView from '../components/TrackPageView';
import StoryList from '../components/StoryList';

export default () => (
  <Container fluid>
    <Title value="Home" />
    <TrackPageView params={{ page_title: 'Home' }} />

    <Row className="mt-5">
      <Col className="mx-5">
        <StoryList first={10} />
      </Col>
    </Row>
  </Container>
);
