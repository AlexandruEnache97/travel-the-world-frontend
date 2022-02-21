import * as React from 'react';
import './spinner.scss';

const Spinner = () => (
  <div className="loading-spinner">
    <div className="loading-icon" data-testid="spinner" />
  </div>
);

export default Spinner;
