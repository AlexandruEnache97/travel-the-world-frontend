const calculateTimePassed = (createdDate: string) => {
  const secondsPassed: number = Math.round((Date.now() - Date.parse(createdDate)) / 1000);
  if (secondsPassed > 60 * 60 * 24) {
    return `${Math.round(secondsPassed / 60 / 60 / 24)} days ago`;
  } if (secondsPassed > 60 * 60) {
    return `${Math.round(secondsPassed / 60 / 60)} hours ago`;
  } if (secondsPassed > 60) {
    return `${Math.round(secondsPassed / 60)} minutes ago`;
  }
  return 'A minute ago';
};

export default calculateTimePassed;
