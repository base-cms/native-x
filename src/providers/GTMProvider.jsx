import React from 'react';
import PropTypes from 'prop-types';
import GTM from '../lib/gtm';

const GTMContext = React.createContext({});

export const GTMConsumer = GTMContext.Consumer;

export const GTMProvider = ({ gtm, children }) => (
  <GTMContext.Provider value={{ gtm }}>
    {children}
  </GTMContext.Provider>
);

GTMProvider.propTypes = {
  gtm: PropTypes.instanceOf(GTM).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
