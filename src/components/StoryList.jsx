import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import {
  Card,
  CardBody,
  CardHeader,
  ListGroup,
} from 'reactstrap';
import LoadingBar from './LoadingBar';
import ErrorAlert from './ErrorAlert';
import StoryListItem from './StoryList/Item';

import query from '../gql/queries/story/list.graphql';

const StoryList = ({ first, sort }) => {
  const variables = {
    sort,
    pagination: { first },
  };
  return (
    <Card>
      <CardHeader>
        <h4 className="mb-0">
          Latest
          {' '}
          Stories
        </h4>
      </CardHeader>
      <Query query={query} variables={variables}>
        {({ loading, error, data }) => {
          if (loading) {
            return (
              <CardBody>
                <LoadingBar />
              </CardBody>
            );
          }
          if (error) {
            return (
              <CardBody>
                <ErrorAlert message={error.message} />
              </CardBody>
            );
          }
          const { allStories } = data;
          return (
            <ListGroup flush>
              {allStories.edges.map(edge => <StoryListItem key={edge.node.id} {...edge.node} />)}
            </ListGroup>
          );
        }}
      </Query>
    </Card>
  );
};

StoryList.defaultProps = {
  first: 20,
  sort: {
    field: 'publishedAt',
    order: -1,
  },
};

StoryList.propTypes = {
  first: PropTypes.number,
  sort: PropTypes.shape({
    field: PropTypes.string.isRequired,
    order: PropTypes.number,
  }),
};

export default StoryList;
