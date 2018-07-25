import React from 'react';
import Lottie from 'react-lottie';
import PropTypes from 'prop-types';
import * as animationData from '../assets/anim/loader.json';
export const Loading = props => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  return (
    <div style={{minHeight: '60vh',display: 'flex',alignItems: 'center',justifyContent: 'center'}} className="text-center">
      <h4 className="slim-header text-muted text-center">
        <Lottie options={defaultOptions} height={100} width={100} />
        {props.title}
      </h4>
    </div>
  );
};

Loading.propTypes = {
  title: PropTypes.string
};
