import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import HeaderStyle from './HeaderStyle';
import HeaderHtml from './HeaderHtml';

const Header = (props) => {
  const {
    title,
    teaser,
    primaryImgSrc,
    primaryImgCaption,
  } = props;

  return (
    <div className="story-header">
      <HeaderStyle />
      <Head>
        <title>{title}</title>
        <meta name="description" story={teaser} />
      </Head>
      <HeaderHtml title={title} primaryImgSrc={primaryImgSrc} primaryImgCaption={primaryImgCaption}/>
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
