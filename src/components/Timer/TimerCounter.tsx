import { useEffect, useState, ChangeEvent } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';

import {
  setRunning,
  setTimeRemaining,
  setTimeRemainingToSettings,
  skipForwards,
} from '../../store/timerSlice';

import CounterInput from '../UI/Inputs/CounterInput';

import convertTime from '../../helpers/convertTime';

import classes from './TimerCounter.module.css';

const TimerCounter = () => {
  const dispatch = useAppDispatch();
  const mode = useAppSelector((state) => state.timer.mode);
  const running = useAppSelector((state) => state.timer.running);
  const minutes = useAppSelector((state) => state.timer.timeRemaining.minutes);
  const seconds = useAppSelector((state) => state.timer.timeRemaining.seconds);
  const settingsChanged = useAppSelector(
    (state) => state.timer.settingsChanged
  );

  const [minutesCounterInputValue, setMinutesCounterInputValue] = useState(
    `${minutes}`
  );
  const [secondsCounterInputValue, setSecondsCounterInputValue] = useState(
    `${seconds}`
  );

  const minutesCounterInputBlurHandler = () => {
    const value = parseFloat(minutesCounterInputValue);
    if (!isNaN(value)) {
      dispatch(setTimeRemaining({ minutes: value, seconds: seconds }));
    }
  };
  const secondsCounterInputBlurHandler = () => {
    const value = parseFloat(secondsCounterInputValue);
    if (!isNaN(value)) {
      dispatch(setTimeRemaining({ minutes: minutes, seconds: value }));
    }
  };

  const minutesCounterInputChangeHandler = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(setRunning(false));
    setMinutesCounterInputValue(event.target.value);
  };

  const secondsCounterInputChangeHandler = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(setRunning(false));
    setSecondsCounterInputValue(event.target.value);
  };

  useEffect(() => {
    // Update input values to reflect state
    setMinutesCounterInputValue(convertTime(minutes));
    setSecondsCounterInputValue(convertTime(seconds));
    // Change time when the settings are changed
    if (settingsChanged === true) {
      dispatch(setTimeRemainingToSettings());
    }

    // Timer logic
    const intervalId = setInterval(() => {
      if (minutes === 0 && seconds === 0) {
        dispatch(skipForwards());
      } else if (seconds === 0) {
        dispatch(setTimeRemaining({ minutes: minutes - 1, seconds: 59 }));
      } else {
        dispatch(setTimeRemaining({ minutes: minutes, seconds: seconds - 1 }));
      }
    }, 1000);

    if (running === false) {
      clearInterval(intervalId);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [dispatch, minutes, seconds, mode, running, settingsChanged]);

  return (
    <div className={classes['counter']}>
      <div className={classes['counter__content']}>
        <CounterInput
          inputValue={minutesCounterInputValue}
          changeHandler={minutesCounterInputChangeHandler}
          blurHandler={minutesCounterInputBlurHandler}
        />
        <span className={classes['counter__colon']}>:</span>
        <CounterInput
          inputValue={secondsCounterInputValue}
          changeHandler={secondsCounterInputChangeHandler}
          blurHandler={secondsCounterInputBlurHandler}
        />
      </div>
    </div>
  );
};

export default TimerCounter;
