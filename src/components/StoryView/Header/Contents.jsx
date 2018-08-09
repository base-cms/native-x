import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Container } from 'reactstrap';

const StoryViewHeaderContents = ({ title }) => (
  <Container className="align-self-center">
    <Row>
      <Col className="post-heading">
        <h1 className="p-2 text-white">
          {title}
        </h1>
      </Col>
    </Row>
  </Container>
);

StoryViewHeaderContents.propTypes = {
  title: PropTypes.string.isRequired,
};

export default StoryViewHeaderContents;
