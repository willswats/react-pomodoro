const convertTime = (time: number) => {
  if (time >= 0 && time <= 9) {
    return `0${time}`;
  } else {
    return `${time}`;
  }
};

export default convertTime;
