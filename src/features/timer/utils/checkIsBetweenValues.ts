export const checkIsBetweenValues = (
  checkValue: number,
  lowValue: number,
  highValue: number
) => {
  if (checkValue < lowValue || checkValue > highValue) {
    return false;
  } else {
    return true;
  }
};
