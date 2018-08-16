import React from 'react';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';
import Title from '../components/Title';
import StoryList from '../components/StoryList';
import { AccountConsumer } from '../providers/AccountProvider';
import { GTAGTracker } from '../lib/gtag';

export default () => {
  const tracker = new GTAGTracker({
    page_path: '/',
    page_title: 'Home',
  });
  return (
    <Container fluid>
      <Title value="Home" />
      {tracker.pageview()}
      <Row className="my-3">
        <Col className="mx-5">
          <AccountConsumer>
            {({ account }) => (
              <h1 className="mb-0">
                {account.name}
              </h1>
            )}
          </AccountConsumer>
          <hr className="mb-4" />
          <StoryList first={10} />
        </Col>
      </Row>
    </Container>
  );
};
