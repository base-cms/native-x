import 'bootstrap';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './containers/Home';
import Story from './containers/Story';

const App = () => (
  <div>
    <Nav
      brandName="Firehouse.com"
      url="https://www.firehouse.com"
      imgSrc="https://cdn.firehouse.com/files/base/cygnus/fhc/image/static/logo/site_logo.png"
    />
    <div className="container my-3">
      <div className="row">
        <div className="col">
          <Route exact path="/" component={Home} />
          <Route path="/story" component={Story} />
        </div>
      </div>
    </div>
  </div>
);

ReactDOM.render(
  (
    <Router>
      <App />
    </Router>
  ),
  document.getElementById('app'),
);
