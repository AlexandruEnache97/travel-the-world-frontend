const isMobileWindow = (windowSize: number) => {
  if (windowSize > 601) return false;
  return true;
};

export default isMobileWindow;
