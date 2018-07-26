import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { Row, Col, Container } from 'reactstrap';
import Imgix from '../Imgix';
import HeaderStyle from './HeaderStyle';

const Header = (props) => {
  const {
    title,
    primaryImgSrc,
    primaryImgCaption,
    teaser,
  } = props;

  return (
    <div className="story-header">
      <HeaderStyle />
      <Head>
        <title>{title}</title>
        <meta name="description" story={teaser} />
      </Head>
      <Imgix tag="div" className="d-flex bg-imgIx img-fluid" src={primaryImgSrc} alt={primaryImgCaption} title={title} w="1200" h="600" fit="crop" crop="faces,edges">
        <Container className="align-self-center">
          <Row>
            <Col className="post-heading">
              <h1 className="p-2 text-white">{title}</h1>
            </Col>
          </Row>
        </Container>
      </Imgix>
    </div>
  );
};

Header.defaultProps = {
  teaser: '',
  primaryImgCaption: '',
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  teaser: PropTypes.string,
  primaryImgSrc: PropTypes.string.isRequired,
  primaryImgCaption: PropTypes.string,
};

export default Header;
