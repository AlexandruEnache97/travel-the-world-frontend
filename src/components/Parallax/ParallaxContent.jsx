import React from 'react';
import ParallaxObjects from './ParallaxObjects';
import Baloon from '../../images/parallaxObjectives/hot-air-balloon.png';
import Clouds from '../../images/parallaxObjectives/clouds.png';
import Airplane from '../../images/parallaxObjectives/airplane.png';
import Suitcases from '../../images/parallaxObjectives/suitcases.png';
import Passport from '../../images/parallaxObjectives/passport.png';
import Globe from '../../images/parallaxObjectives/globe.png';

import './parallaxContent.scss';

const ParallaxContent = () => (
  <>
    <div className="parallax-container">
      <div>
        <ParallaxObjects
          activeObject={Baloon}
          passiveObject={Clouds}
          offsetTop={0}
        />
      </div>
      <div>
        <ParallaxObjects
          activeObject={Airplane}
          passiveObject={Suitcases}
          offsetTop={4200}
        />
      </div>
      <div>
        <ParallaxObjects
          activeObject={Passport}
          passiveObject={Globe}
          offsetTop={4200 * 2}
        />
      </div>
      <div>
        <ParallaxObjects
          activeObject={Baloon}
          passiveObject={Clouds}
          offsetTop={4200 * 3}
        />
      </div>
    </div>
    <div className="parallax-container-right">
      <div className="empty-div" />
      <div>
        <ParallaxObjects
          activeObject={Passport}
          passiveObject={Globe}
          offsetTop={2100}
        />
      </div>
      <div>
        <ParallaxObjects
          activeObject={Baloon}
          passiveObject={Clouds}
          offsetTop={2100 + 4200}
        />
      </div>
      <div>
        <ParallaxObjects
          activeObject={Airplane}
          passiveObject={Suitcases}
          offsetTop={2100 + 4200 * 2}
        />
      </div>
    </div>
  </>
);

export default ParallaxContent;
