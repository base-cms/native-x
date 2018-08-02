import React from 'react';

export default () => (
  <style jsx global>{`
    nav.fixed-top {
      transition: top 0.1s ease-in-out;
      transition: background-color 0.1s ease-in-out;
      background-color: #fff;
      box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.50), 0 2px 10px 0 rgba(0, 0, 0, 0.50);
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
