import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { Row, Col, Container } from 'reactstrap';
import HeaderStyle from './HeaderStyle';
import Imgix from '../Imgix';

const Header = (props) => {
  const {
    title,
    teaser,
    primaryImgSrc,
    primaryImgCaption,
  } = props;

  const contents = (
    <Container className="align-self-center">
      <Row>
        <Col className="post-heading">
          <h1 className="p-2 text-white">{title}</h1>
        </Col>
      </Row>
    </Container>
  );

  return (
    <div className="story-header">
      <HeaderStyle />
      <Head>
        <title>{title}</title>
        <meta name="description" story={teaser} />
      </Head>
      {primaryImgSrc ? (
        <Imgix tag="div" className="d-flex bg-imgIx img-fluid" src={primaryImgSrc} alt={primaryImgCaption} title={title} w="1200" h="600" fit="crop" crop="focalpoint">
          {contents}
        </Imgix>
      ) : (
        <div className="d-flex bg-imgIx">
          {contents}
        </div>
      )}
    </div>
  );
};

Header.defaultProps = {
  teaser: '',
  primaryImgCaption: '',
  primaryImgSrc: '',
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  teaser: PropTypes.string,
  primaryImgSrc: PropTypes.string,
  primaryImgCaption: PropTypes.string,
};

export default Header;
