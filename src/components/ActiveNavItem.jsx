import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { NavItem, NavLink } from 'reactstrap';
import { withRouter } from 'next/router';

const ActiveNavItem = ({
  children,
  router,
  href,
  title,
}) => {
  const isActive = router.pathname === href;
  return (
    <NavItem active={isActive}>
      <Link href={href} passHref>
        <NavLink title={title}>{children}</NavLink>
      </Link>
    </NavItem>
  );
};

ActiveNavItem.propTypes = {
  href: PropTypes.string.isRequired,
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  router: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

ActiveNavItem.defaultProps = {
  title: null,
};

export default withRouter(ActiveNavItem);
