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
    <div
      style={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      className="text-center"
    >
      <h3 className="slimmy text-muted text-center">
        <Lottie options={defaultOptions} height={100} width={100} />
        {props.title}
      </h3>
    </div>
  );
};
export const Warning = props => {
  return (
    <div
      style={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      className="text-center"
    >
      <h3 className="slimmy text-center text-danger">
        <i className='icon ion-md-warning'/><br/>
        {props.title}
      </h3>
    </div>
  );
};

Warning.propTypes = {
  title: PropTypes.string
};

Loading.propTypes = {
  title: PropTypes.string
};
