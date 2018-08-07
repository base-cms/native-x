import React from 'react';
import { Navbar, Nav, Container } from 'reactstrap';
import NavbarStyle from './NavbarStyle';
import { StoryContext } from './StoryProvider';
import Imgix from './Imgix';
// import { AccountContext } from './AccountProvider';

export default () => (
  <Container className="fixed-top bg-white px-0" fluid>
    <NavbarStyle />
    {/* <Navbar id="publisher-bar" className="small d-flex flex-row justify-content-start bg-dark">
      <div class="arrow-left align-self-center mr-1"/>
      <small class="text-uppercase align-self-center mr-1 text-white">[cname].com</small>
    </Navbar> */}
    <Navbar id="branding-bar" expand>
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
                  fit="max"
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
  </Container>
);
