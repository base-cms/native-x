import React from 'react';
import { Navbar, Nav } from 'reactstrap';
import NavbarStyle from './NavbarStyle';
import { StoryContext } from './StoryProvider';
import Imgix from './Imgix';
// import { AccountContext } from './AccountProvider';

export default () => (
  <Navbar expand fixed="top">
    <NavbarStyle />
    <Nav className="position-absolute">
      {/* <AccountContext.Consumer>
        {({ branding }) => {
          return (
            <Imgix
              className="d-flex bg-imgIx img-fluid"
              src={branding.logo.url}
              alt={branding.name}
              title={branding.name}
              w="250"
              h="45"
            />
        ) }}
      </AccountContext.Consumer> */}
    </Nav>
    <Nav className="mx-auto navbar-logo" navbar>
      <StoryContext.Consumer>
        {({ story }) => {
          if (story.advertiser && story.advertiser.logo) {
            return (
              <Imgix
                className="d-flex bg-imgIx img-fluid"
                src={story.advertiser.logo.src}
                alt={story.advertiser.name}
                title={story.advertiser.name}
                w="300"
                h="50"
                fit="clip"
              />
            );
          }
          return (
            {/*
              figure out what to put instead of advertiser
            */}
          );
        }}
      </StoryContext.Consumer>
      {/* <ActiveNavItem href="/" title="Home">Home</ActiveNavItem>
      <ActiveNavItem href="/about" title="About">About</ActiveNavItem> */}
    </Nav>
  </Navbar>
);
