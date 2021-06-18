import React, { useEffect, useState } from 'react';
import backgroundParallax from '../../images/firstPage/backgroundParallax.png';
import backgroundClouds from '../../images/firstPage/backgroundClouds.jpg';
import Navbar from '../../components/Navbar/Navbar';
import './firstPage.scss';

const FirstPage = () => {
  const [offsetY, setOffsetY] = useState(0);
  const [wrapper] = useState(document.getElementById('main-page'));

  const onScroll = () => {
    setOffsetY(wrapper.scrollTop);
  };

  useEffect(() => {
    console.log(offsetY);
  }, [offsetY]);

  useEffect(() => {
    wrapper.addEventListener('scroll', onScroll);

    return () => {
      wrapper.removeEventListener('scroll', onScroll);
    };
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
      <img
        id="globeBackground"
        style={{ transform: `rotate(${-offsetY / 4}deg) translateY(${-offsetY / 8}px)` }}
        className="first-page-background"
        src={backgroundParallax}
        alt=""
      />
      <img
        id="cloudsBackground"
        style={{ transform: `translateX(${-offsetY / 2.5}px)` }}
        className="clouds-background"
        src={backgroundClouds}
        alt=""
      />
    </div>
  );
};

export default FirstPage;
