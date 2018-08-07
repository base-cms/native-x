import React from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import query from '../gql/story.graphql';

export const StoryContext = React.createContext({});

export const StoryProvider = (props) => {
  const input = { id: props.id };
  return (
    <Query query={query} variables={{ input }}>
      {({ error, data }) => {
        if (error) return <p><strong>{error.message}</strong></p>;
        return (
          <StoryContext.Provider value={data}>
            {props.children}
          </StoryContext.Provider>
        );
      }}
    </Query>
  );
};

StoryProvider.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,

};

