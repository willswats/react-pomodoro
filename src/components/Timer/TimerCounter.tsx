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
  const timer = useAppSelector((state) => state.timer);
  const timeRemaining = useAppSelector((state) => state.timer.timeRemaining);

  const [minutesCounterInputValue, setMinutesCounterInputValue] = useState(
    `${timeRemaining.minutes}`
  );
  const [secondsCounterInputValue, setSecondsCounterInputValue] = useState(
    `${timeRemaining.seconds}`
  );

  const minutesCounterInputBlurHandler = () => {
    const value = parseFloat(minutesCounterInputValue);
    if (!isNaN(value)) {
      dispatch(
        setTimeRemaining({ minutes: value, seconds: timeRemaining.seconds })
      );
    }
  };
  const secondsCounterInputBlurHandler = () => {
    const value = parseFloat(secondsCounterInputValue);
    if (!isNaN(value)) {
      dispatch(
        setTimeRemaining({ minutes: timeRemaining.minutes, seconds: value })
      );
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
    setMinutesCounterInputValue(convertTime(timeRemaining.minutes));
    setSecondsCounterInputValue(convertTime(timeRemaining.seconds));
    // Change time when the settings are changed
    if (timer.settingsChanged === true) {
      dispatch(setTimeRemainingToSettings());
    }

    // Timer logic
    const intervalId = setInterval(() => {
      if (timeRemaining.minutes === 0 && timeRemaining.seconds === 0) {
        dispatch(skipForwards());
      } else if (timeRemaining.seconds === 0) {
        dispatch(
          setTimeRemaining({ minutes: timeRemaining.minutes - 1, seconds: 59 })
        );
      } else {
        dispatch(
          setTimeRemaining({
            minutes: timeRemaining.minutes,
            seconds: timeRemaining.seconds - 1,
          })
        );
      }
    }, 1000);

    if (timer.running === false) {
      clearInterval(intervalId);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [
    dispatch,
    timeRemaining.minutes,
    timeRemaining.seconds,
    timer.mode,
    timer.running,
    timer.settingsChanged,
  ]);

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
