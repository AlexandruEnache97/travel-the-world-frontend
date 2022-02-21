import * as React from 'react';
import './mobileButton.scss';

interface Props {
  mobileMenuHandler: (isVisible: boolean) => void
}

const MobileButton: React.FC<Props> = ({ mobileMenuHandler }) => {
  const [visible, setVisible] = React.useState<boolean>(false);

  const handleChangeModal = () => {
    if (!visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'scroll';
    }
    mobileMenuHandler(!visible);
    setVisible(!visible);
  };

  return (
    <button
      type="button"
      className={visible ? 'mobile-button menu-open' : 'mobile-button'}
      onClick={handleChangeModal}
    >
      Menu
    </button>
  );
};

export default MobileButton;
