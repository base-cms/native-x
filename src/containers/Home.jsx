import React from 'react';
import { Helmet } from 'react-helmet';

export default () => (
  <div className="container my-3">
    <Helmet>
      <title>Welcome!</title>
    </Helmet>
    <div className="row">
      <div className="col">
        <h1>Home</h1>
      </div>
    </div>
  </div>
);
