/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';

import './parallaxObjects.scss';

const ParallaxObjects = ({ activeObject, passiveObject, offsetTop }) => {
  const [offsetY, setOffsetY] = useState(0);
  const [wrapper] = useState(document.getElementById('main-page'));
  const handleScroll = () => setOffsetY(wrapper.scrollTop);

  useEffect(() => {
    handleScroll();
    wrapper.addEventListener('scroll', handleScroll);
    return () => {
      wrapper.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {offsetY > offsetTop && offsetY < offsetTop + 4200 && (
        <div className="parallax-object">
          <img
            src={passiveObject}
            alt="clouds"
            style={{
              marginTop: '1000px',
              transform: `translateY(${(offsetY - offsetTop) * 0.8}px)`,
            }}
          />
          <img
            src={activeObject}
            alt="baloon"
            style={{
              marginTop: '500px',
              transform: `translateY(${(offsetY - offsetTop) * 0.6}px)`,
            }}
          />
        </div>
      )}
    </>
  );
};

export default ParallaxObjects;
