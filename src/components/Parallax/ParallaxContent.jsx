import React from 'react';
import ParallaxObjects from './ParallaxObjects';
import Baloon from '../../images/parallaxObjectives/hot-air-balloon.png';
import Clouds from '../../images/parallaxObjectives/clouds.png';
import Airplane from '../../images/parallaxObjectives/airplane.png';
import Suitcases from '../../images/parallaxObjectives/suitcases.png';
import Passport from '../../images/parallaxObjectives/passport.png';
import Globe from '../../images/parallaxObjectives/globe.png';
import Sun from '../../images/parallaxObjectives/sun.png';
import Beach from '../../images/parallaxObjectives/beach.png';
import Trees from '../../images/parallaxObjectives/trees.png';
import Tent from '../../images/parallaxObjectives/tent.png';
import Mountain from '../../images/parallaxObjectives/mountain.png';
import Hiking from '../../images/parallaxObjectives/hiking.png';
import Pyramids from '../../images/parallaxObjectives/pyramids.png';
import Pharaoh from '../../images/parallaxObjectives/pharaoh.png';

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
          activeObject={Pharaoh}
          passiveObject={Pyramids}
          offsetTop={4200 * 3}
        />
      </div>
    </div>
    <div className="parallax-container-right">
      <div className="empty-div" />
      <div>
        <ParallaxObjects
          activeObject={Sun}
          passiveObject={Beach}
          offsetTop={2100}
        />
      </div>
      <div>
        <ParallaxObjects
          activeObject={Tent}
          passiveObject={Trees}
          offsetTop={2100 + 4200}
        />
      </div>
      <div>
        <ParallaxObjects
          activeObject={Hiking}
          passiveObject={Mountain}
          offsetTop={2100 + 4200 * 2}
        />
      </div>
      <div>
        <ParallaxObjects
          activeObject={Passport}
          passiveObject={Globe}
          offsetTop={2100 + 4200 * 3}
        />
      </div>
    </div>
  </>
);

export default ParallaxContent;
