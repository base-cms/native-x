import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {
  Navbar,
  NavbarBrand,
  Nav,
} from 'reactstrap';
import PropTypes from 'prop-types';
// import ActiveNavItem from '../components/ActiveNavItem';

const publisher = { name: 'Firehouse' };

const PageWrapper = props => (
  <div>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" crossOrigin="anonymous" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/froala-editor/2.8.4/css/froala_style.css" type="text/css" />
    </Head>
    <Navbar dark color="dark" expand fixed="top">
      <Link href="/" passHref>
        <NavbarBrand>{ publisher.name }</NavbarBrand>
      </Link>
      <Nav className="mr-auto" navbar>
        {/* <ActiveNavItem href="/" title="Home">Home</ActiveNavItem>
        <ActiveNavItem href="/about" title="About">About</ActiveNavItem> */}
      </Nav>
    </Navbar>
    {props.children}
  </div>
);

PageWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,

};

export default PageWrapper;
