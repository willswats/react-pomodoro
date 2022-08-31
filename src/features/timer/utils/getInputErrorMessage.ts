import { checkIsBetweenValues } from './checkIsBetweenValues';

export const getInputErrorMessage = (inputType: string, value: number) => {
  if (
    inputType === 'pomodoro' ||
    inputType === 'short-break' ||
    inputType === 'long-break'
  ) {
    if (isNaN(value)) {
      return 'This must be a number';
    } else {
      return '';
    }
  }

  if (inputType === 'long-break-interval') {
    if (isNaN(value)) {
      return 'This must be a number';
    } else if (!checkIsBetweenValues(value, 1, 10)) {
      return 'This must be between 1 and 10';
    } else {
      return '';
    }
  }

  return '';
};
