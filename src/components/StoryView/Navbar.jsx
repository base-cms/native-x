import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav } from 'reactstrap';
import Style from './Navbar/Style';
import ImgixURL from '../ImgixURL';

const StoryViewNavbar = ({ title, logoSrc }) => (
  <Fragment>
    <Style />
    <Navbar id="branding-bar" className="fixed-top bg-white">
      <Nav className="mx-auto navbar-logo" navbar>
        <ImgixURL
          src={logoSrc}
          params={{
            w: 300,
            h: 50,
            fit: 'max',
            dpr: 2,
          }}
        >
          {(url) => {
            if (!url) {
              return (
                <div>
                  {title}
                </div>
              );
            }
            const style = {
              maxWidth: '300px',
              maxHeight: '50px',
            };
            return <img src={url} style={style} title={title} alt={title} />;
          }}
        </ImgixURL>
      </Nav>
    </Navbar>
  </Fragment>
);

StoryViewNavbar.defaultProps = {
  logoSrc: '',
};

StoryViewNavbar.propTypes = {
  title: PropTypes.string.isRequired,
  logoSrc: PropTypes.string,
};

export default StoryViewNavbar;
