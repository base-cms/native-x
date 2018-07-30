import React from 'react';
import Link from 'next/link';
import { Navbar, NavbarBrand, Nav } from 'reactstrap';
import NavbarStyle from './NavbarStyle';
// import Imgix from './Imgix';
// import { AccountContext } from './AccountProvider';

export default () => (
  <Navbar expand fixed="top">
    <NavbarStyle />
    <Link href="/" passHref>
      <NavbarBrand>
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
      </NavbarBrand>
    </Link>
    <Nav className="mr-auto" navbar>
      {/* <ActiveNavItem href="/" title="Home">Home</ActiveNavItem>
      <ActiveNavItem href="/about" title="About">About</ActiveNavItem> */}
    </Nav>
  </Navbar>
);
