import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Image extends React.Component {
  constructor(props) {
    super(props);
    this.onImgError = this.onImgError.bind(this);
    this.state = {
      src: props.src,
    };
  }

  onImgError() {
    this.setState({
      src: this.props.defaultSrc,
    });
  }

  render() {
    return (
      <img
        className={this.props.imgKlass}
        src={ this.state.src }
        onError={ this.onImgError.bind(this) }
        alt="avatar"
      />
    );
  }
}

Image.defaultProps = {
  defaultSrc: '',
  src: '',
  imgKlass: '',
};

Image.propTypes = {
  defaultSrc: PropTypes.string,
  src: PropTypes.string,
  imgKlass: PropTypes.string,
};

export default Image;
