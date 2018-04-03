import React from 'react';
import { Helmet } from 'react-helmet';

export default () => (
  <div className="container my-3">
    <Helmet>
      <title>404 Not Found</title>
    </Helmet>
    <div className="row">
      <div className="col">
        <h1>Oops! Page not found. :(</h1>
      </div>
    </div>
  </div>
);
