import React from 'react';
import PropTypes from 'prop-types';
import { ListGroupItem } from 'reactstrap';
import Link from 'next/link';
import Imgix from '../Imgix';

const StoryListItem = ({
  id,
  title,
  teaser,
  primaryImage,
  advertiser,
  publishedAt,
}) => (
  <Link as={`/story/${id}`} href={`/story?id=${id}`} passHref>
    <ListGroupItem tag="a" href="#" className="flex-column align-items-start" action>
      <div className="d-flex flex-row justify-content-between">

        <div className="d-flex flex-row">
          {primaryImage && primaryImage.src
            && (
              <div className="d-flex flex-column my-auto mr-3">
                <Imgix
                  src={primaryImage.src}
                  w="150"
                  h="150"
                  width="150"
                  height="150"
                  fit="crop"
                  crop="focalpoint"
                  fp-x={primaryImage.focalPoint.x}
                  fp-y={primaryImage.focalPoint.y}
                  dpr={2}
                />
              </div>
            )
          }

          <div className="d-flex flex-column">
            <h5 className="mb-2">
              {title}
            </h5>
            <h6 className="mb-0">
              From: {advertiser.name}
            </h6>
            {teaser.length > 0
              && (
                <p className="mt-1 mb-0 text-muted">
                  {teaser}
                </p>
              )
            }
            <small className="mt-auto">Published: {publishedAt}</small>
          </div>

        </div>

      </div>
    </ListGroupItem>
  </Link>
);

StoryListItem.defaultProps = {
  teaser: '',
};

StoryListItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  teaser: PropTypes.string,
};

export default StoryListItem;
