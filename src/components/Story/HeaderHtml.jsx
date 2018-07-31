import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Container } from 'reactstrap';
import Imgix from '../Imgix';

const HeaderHtml = (props) => {
  const {
    title,
    primaryImgSrc,
    primaryImgCaption,
  } = props;

  if (primaryImgSrc) {
    return (
      <Imgix tag="div" className="d-flex bg-imgIx img-fluid" src={primaryImgSrc} alt={primaryImgCaption} title={title} w="1200" h="600" fit="crop" crop="faces,edges">
        <Container className="align-self-center">
          <Row>
            <Col className="post-heading">
              <h1 className="p-2 text-white">{title}</h1>
            </Col>
          </Row>
        </Container>
      </Imgix>
    );
  } else {
      return (
        <div className="d-flex bg-imgIx">
          <Container className="align-self-center">
            <Row>
              <Col className="post-heading">
                <h1 className="p-2 text-white">{title}</h1>
              </Col>
            </Row>
          </Container>
        </div>
      );
    }
};

HeaderHtml.propTypes = {
  title: '',
  primaryImgCaption: '',
  primaryImgSrc: '',
};

HeaderHtml.propTypes = {
  teaser: PropTypes.string,
  primaryImgSrc: PropTypes.string,
  primaryImgCaption: PropTypes.string,
};

export default HeaderHtml;
