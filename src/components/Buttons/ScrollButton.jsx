import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link as LinkScroll } from 'react-scroll';
import './scrollButton.scss';

const ScrollButton = ({ refId }) => {
  const [showScroll, setShowScroll] = useState(false);

  return (
    <div>
      <LinkScroll
        to={refId}
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

ScrollButton.propTypes = {
  refId: PropTypes.string.isRequired,
};

export default ScrollButton;
