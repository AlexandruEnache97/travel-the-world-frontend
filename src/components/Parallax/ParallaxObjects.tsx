import * as React from 'react';

import './parallaxObjects.scss';

interface Props {
  activeObject: string,
  passiveObject: string,
  offsetTop: number
}

const ParallaxObjects: React.FC<Props> = ({ activeObject, passiveObject, offsetTop }) => {
  const [offsetY, setOffsetY] = React.useState<number>(0);
  const wrapper = document.getElementById('main-page');

  const handleScroll = () => {if(wrapper !== null) setOffsetY(wrapper.scrollTop)};

  React.useEffect(() => {
    if(wrapper !== null) {
      handleScroll();
      wrapper.addEventListener('scroll', handleScroll);
      return () => {
        wrapper.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  return (
    <>
      {offsetY > offsetTop && offsetY < offsetTop + 5400 && (
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
