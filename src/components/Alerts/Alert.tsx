import * as React from 'react';
import './alert.scss';

interface Props {
  alert: {
    active: boolean,
    message: string,
  },
  removeAlert: (message: string) => void;
}

type CancelAlert = (event: React.MouseEvent<HTMLButtonElement>) => void;

const Alert: React.FC<Props> = ({ removeAlert, alert }) => {
  const cancelAlert: CancelAlert = () => {
    removeAlert(alert.message);
  };

  return (
    <>
      { alert.active && (
        <div className="alert-container">
          <p>{alert.message}</p>
          <button type="button" onClick={cancelAlert}>x</button>
        </div>
      )}
    </>
  );
};

export default Alert;
