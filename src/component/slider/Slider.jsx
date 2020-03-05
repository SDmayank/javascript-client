import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Img from './style';
import { getNextRoundRobin, getRandomNumber } from '../../libs/utils/math';
import { PUBLIC_IMAGE_FOLDER, DEFAULT_BANNER_IMAGE } from '../../config/constant';


class Slider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current: -1,
    };
  }

  componentDidMount() {
    const { random, duration, banners } = this.props;
    this.id = setInterval(() => {
      let { current } = this.state;
      if (random && banners.length) {
        current = getRandomNumber(banners.length);
      } else if (banners.length) {
        current = getNextRoundRobin(banners.length, current);
      }

      this.setState({ current });
    }, duration);
  }

  componentWillUnmount() {
    clearInterval(this.id);
  }

  render() {
    const {
      altText, height, banners, defaultBanner,
    } = this.props;
    const { current } = this.state;
    let path;
    if (current === -1) {
      if (defaultBanner) {
        path = `${PUBLIC_IMAGE_FOLDER}banners/${defaultBanner}`;
      } else {
        path = PUBLIC_IMAGE_FOLDER + DEFAULT_BANNER_IMAGE;
      }
    } else {
      path = PUBLIC_IMAGE_FOLDER + banners[current];
    }
    return (
      <Img src={path} alt={altText} height={height} />
    );
  }
}

Slider.propTypes = {
  altText: PropTypes.string,
  defaultBanner: PropTypes.string,
  banners: PropTypes.arrayOf(PropTypes.string),
  duration: PropTypes.number,
  height: PropTypes.number,
  random: PropTypes.bool,
};

Slider.defaultProps = {
  altText: 'Default Banner',
  banners: [],
  defaultBanner: 'default.png',
  duration: 2000,
  height: 200,
  random: false,
};

export default Slider;
