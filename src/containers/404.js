import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import Lottie from 'react-lottie';
import { Link } from "react-router-dom";
import Header from '../components/Header';
import Footer from '../components/Footer';
import connectAnimation from '../assets/anim/businesses-anim.json';

/**
 * 404 Page not found component
 */
export const NotFound = () => {
  const animOptions = {
    loop: false,
    autoplay: true,
    animationData: connectAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  return (
    <Fragment>
      <Helmet>
        <title>Sorry!, Page not found!</title>
      </Helmet>
      <div className="body">
        <Header />
        <section
          className="content"
          style={{ backgroundColor: 'rgba(206, 203, 203, 0.76)' }}
        >
          <div className="container">
            <div className="row">
              <div className="col-md-6 m-auto">
                <h2 className="text-danger v-slim-header">
                  Sorry, age you are looking for was not found! <br />
                </h2>
                <br />
                <div>
                  <Link to='/' className="btn btn-primary">Take me back home</Link>
                </div>
              </div>
              <div className="col-md-6">
                <Lottie options={animOptions} width={600} height={500} />
              </div>
            </div>
          </div>
          <Footer />
        </section>
      </div>
    </Fragment>
  );
};
export default NotFound;