import React from 'react';

export default () => (
  <style jsx global>{`
    nav.fixed-top {
      transition: top 0.1s ease-in-out;
      transition: background-color 0.1s ease-in-out;
      background-color: transparent;
    }
    .fixed-top.nav-down {
      background-color: rgba(0,0,0,0.75);
    }
    .fixed-top.nav-up {
      top: -71px;
    }
  `}
  </style>
);
