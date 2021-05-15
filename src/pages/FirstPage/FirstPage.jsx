import React, { useEffect } from 'react';
import backgroundParallax from '../../images/firstPage/backgroundParallax.png';
import backgroundClouds from '../../images/firstPage/backgroundClouds.jpg';
import Navbar from '../Dashboard/components/Navbar';
import './firstPage.scss';

const FirstPage = () => {
  useEffect(() => {
    const globeBackground = document.getElementById('globeBackground');
    const cloudsBackground = document.getElementById('cloudsBackground');
    const wrapper = document.getElementById('main-page');

    wrapper.addEventListener('scroll', () => {
      globeBackground.style.transform = `rotate(${-wrapper.scrollTop / 4}deg) translateY(${-wrapper.scrollTop / 8}px)`;
      cloudsBackground.style.transform = `translateX(${-wrapper.scrollTop / 2.5}px)`;
    });
  }, []);

  return (
    <div className="page-container">
      <Navbar signOut={() => { }} />
      <div className="first-page-intro">
        {/* <p>Travel the world</p> */}
      </div>
      <div id="desc" className="first-page-description">
        {/* <p>Travel the world</p> */}
      </div>
      <img id="globeBackground" className="first-page-background" src={backgroundParallax} alt="" />
      <img id="cloudsBackground" className="clouds-background" src={backgroundClouds} alt="" />
    </div>
  );
};

export default FirstPage;
