import { useEffect, useState, ChangeEvent } from 'react';

import { useAppDispatch, useAppSelector } from 'hooks';

import {
  setRunning,
  setTimeRemaining,
  setTimeRemainingToSettings,
  setPomodoroCountForwards,
} from 'features/timer';

import { convertTime } from 'features/timer';

import { CounterInput } from 'components';

import styles from './styles.module.css';

export const TimerCounter = () => {
  const dispatch = useAppDispatch();
  const timer = useAppSelector((state) => state.timer);
  const timeRemaining = useAppSelector((state) => state.timer.timeRemaining);

  const [counterInputValues, setCounterInputValues] = useState({
    minutes: `${timeRemaining.minutes}`,
    seconds: `${timeRemaining.seconds}`,
  });

  const counterInputBlurHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const id = event.target.id;
    switch (id) {
      case 'minutes':
        const convertedMinutes = parseFloat(counterInputValues.minutes);
        if (!isNaN(convertedMinutes)) {
          dispatch(
            setTimeRemaining({
              minutes: convertedMinutes,
              seconds: timeRemaining.seconds,
            })
          );
        }
        break;
      case 'seconds':
        const convertedSeconds = parseFloat(counterInputValues.seconds);
        if (!isNaN(convertedSeconds)) {
          dispatch(
            setTimeRemaining({
              minutes: timeRemaining.minutes,
              seconds: convertedSeconds,
            })
          );
        }
    }
  };

  const counterInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const id = event.target.id;
    dispatch(setRunning(false));
    switch (id) {
      case 'minutes':
        setCounterInputValues((state) => {
          return {
            ...state,
            minutes: event.target.value,
          };
        });
        break;
      case 'seconds':
        setCounterInputValues((state) => {
          return {
            ...state,
            seconds: event.target.value,
          };
        });
    }
  };

  useEffect(() => {
    // Update input values to reflect state
    setCounterInputValues({
      minutes: convertTime(timeRemaining.minutes),
      seconds: convertTime(timeRemaining.seconds),
    });
    // Change time when the settings are changed
    if (
      timer.settingsChanged.pomodoro === true ||
      timer.settingsChanged.shortBreak === true ||
      timer.settingsChanged.longBreak === true
    ) {
      dispatch(setTimeRemainingToSettings());
    }

    // Timer logic
    const intervalId = setInterval(() => {
      if (timeRemaining.minutes === 0 && timeRemaining.seconds === 0) {
        dispatch(setPomodoroCountForwards());
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
    <div className={styles['counter']}>
      <div className={styles['counter__content']}>
        <CounterInput
          id="minutes"
          inputValue={counterInputValues.minutes}
          changeHandler={counterInputChangeHandler}
          blurHandler={counterInputBlurHandler}
        />
        <span className={styles['counter__colon']}>:</span>
        <CounterInput
          id="seconds"
          inputValue={counterInputValues.seconds}
          changeHandler={counterInputChangeHandler}
          blurHandler={counterInputBlurHandler}
        />
      </div>
    </div>
  );
};