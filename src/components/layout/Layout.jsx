import React from 'react';
import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive';

const Layout = ({ mobile, desktop }) => {
  const isDesktop = useMediaQuery({ minWidth: 769 });
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <>
      {isDesktop && desktop}
      {isMobile && mobile}
    </>
  );
};

Layout.propTypes = {
  mobile: PropTypes.node.isRequired,
  desktop: PropTypes.node.isRequired,
};

export default Layout;
