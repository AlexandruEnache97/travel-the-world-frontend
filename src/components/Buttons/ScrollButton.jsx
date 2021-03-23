import React, { useState } from 'react';
import { Link as LinkScroll } from 'react-scroll';
import './scrollButton.scss';

const ScrollButton = () => {
  const [showScroll, setShowScroll] = useState(false);

  return (
    <div>
      <LinkScroll
        to="topRef"
        spy
        smooth
        duration={800}
        offset={-100}
        onSetActive={() => setShowScroll(false)}
        onSetInactive={() => setShowScroll(true)}
      >
        {showScroll && (
          <img
            className="dashboard-scroll"
            src="https://img.icons8.com/ios-filled/100/ffffff/up-squared.png"
            alt="topButton"
          />
        )}
      </LinkScroll>
    </div>
  );
};

export default ScrollButton;
