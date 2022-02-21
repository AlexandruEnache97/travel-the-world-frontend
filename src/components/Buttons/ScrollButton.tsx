import * as React from 'react';
import { Link as LinkScroll } from 'react-scroll';
import './scrollButton.scss';

interface Props {
  refId: string
}

const ScrollButton: React.FC<Props> = ({ refId }) => {
  const [showScroll, setShowScroll] = React.useState<boolean>(false);

  return (
    <div className="scroll-button">
      <LinkScroll
        to={refId}
        containerId="main-page"
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
