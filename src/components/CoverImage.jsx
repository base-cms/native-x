import React from 'react';
import PropTypes from 'prop-types';
import { jarallax } from 'jarallax';

class CoverImage extends React.Component {
  /**
   *
   */
  componentDidMount() {
    jarallax(this.el);
  }

  /**
   *
   */
  render() {
    let img;
    if (this.props.imgSrc) {
      img = <img className="jarallax-img" src={this.props.imgSrc} alt="" />;
    }
    return (
      <header
        className="jarallax"
        ref={(el) => {
          this.el = el;
        }}
      >
        {img}
        <div className="header-title">
          <div className="header-title-cell">
            <h1>{this.props.title}</h1>
          </div>
        </div>
      </header>
    );
  }
}

CoverImage.defaultProps = {
  imgSrc: '',
};

CoverImage.propTypes = {
  imgSrc: PropTypes.string,
  title: PropTypes.string.isRequired,
};

export default CoverImage;
