import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { Row, Col, Container } from 'reactstrap';
import Imgix from '../Imgix';
import HeaderText from './HeaderText';
import HeaderStyle from './HeaderStyle';

const Header = (props) => {
  const {
    title,
    teaser,
    primaryImgSrc,
    primaryImgCaption,
  } = props;

  const headerHTML = primaryImgSrc
    ?
    <Imgix tag="div" className="d-flex bg-imgIx img-fluid" src={primaryImgSrc} alt={primaryImgCaption} title={title} w="1200" h="600" fit="crop" crop="faces,edges">
      <HeaderText title={title} />
    </Imgix>
    :
    <div className="d-flex bg-imgIx">
      <HeaderText title={title} />
    </div>
    ;

  return (
    <div className="story-header">
      <HeaderStyle />
      <Head>
        <title>{title}</title>
        <meta name="description" story={teaser} />
      </Head>
      {headerHTML}
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
