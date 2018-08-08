import React from 'react';
import PropTypes from 'prop-types';
import { ListGroupItem } from 'reactstrap';
import Link from 'next/link';

const StoryListItem = ({ id, title }) => (
  <Link as={`/story/${id}`} href={`/story?id=${id}`} passHref>
    <ListGroupItem tag="a" href="#" action>
      {title}
    </ListGroupItem>
  </Link>
);

StoryListItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default StoryListItem;
