import React from 'react';
import Link from 'next/link';
import {
  Navbar,
  NavbarBrand,
  Nav,
} from 'reactstrap';
import PropTypes from 'prop-types';
import Imgix from './Imgix';
// import ActiveNavItem from '../components/ActiveNavItem';

const brand = {
  name: 'Firehouse.com',
  logo: {
    src: 'https://fortnight.imgix.net/ebm/5b476cd5e4f5510001847c65/fh_logo.png',
  },
};

const PageWrapper = props => (
  <div>
    <style jsx global>{`
        nav.navbar.fixed-top + section {
          margin-top: 55px;
        }
      `}
    </style>
    <Navbar dark color="dark" expand fixed="top">

      <Link href="/" passHref>
        <NavbarBrand>
          <Imgix className="d-flex bg-imgIx img-fluid" src={brand.logo.src} alt={brand.name} title={brand.name} w="250" h="45" />
        </NavbarBrand>
      </Link>
      <Nav className="mr-auto" navbar>
        {/* <ActiveNavItem href="/" title="Home">Home</ActiveNavItem>
        <ActiveNavItem href="/about" title="About">About</ActiveNavItem> */}
      </Nav>
    </Navbar>
    <section>
      {props.children}
    </section>
  </div>
);

PageWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,

};

export default PageWrapper;
