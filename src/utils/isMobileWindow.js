const isMobileWindow = (windowSize) => {
  if (windowSize > 601) return false;
  return true;
};

export default isMobileWindow;
