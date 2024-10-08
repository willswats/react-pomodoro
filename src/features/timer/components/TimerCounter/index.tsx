import { useEffect, useState, ChangeEvent } from 'react';

import { useAppDispatch, useAppSelector } from 'hooks';

import {
  setRunning,
  setTimeRemaining,
  setTimeRemainingToSettings,
  setPomodoroCountForwards,
  convertTime,
  notifyTimerFinished,
} from 'features/timer';

import { CounterInput } from 'components';

import { Howl } from 'howler';

import ding from 'assets/sounds/ding.mp3';

import styles from './styles.module.css';

export const TimerCounter = () => {
  const dispatch = useAppDispatch();
  const timer = useAppSelector((state) => state.timer);
  const timeRemaining = useAppSelector((state) => state.timer.timeRemaining);

  const playDing = () => {
    new Howl({ src: [ding], volume: timer.settings.endSoundVolume }).play();
  };

  const [counterInputValues, setCounterInputValues] = useState({
    minutes: `${timeRemaining.minutes}`,
    seconds: `${timeRemaining.seconds}`,
  });

  // Update the timeRemaining with the input values on blur
  const counterInputBlurHandler = (event: ChangeEvent<HTMLInputElement>) => {
    // Get id of the input
    const id = event.target.id;
    switch (id) {
      case 'minutes':
        const convertedMinutes = parseFloat(counterInputValues.minutes);
        if (
          !isNaN(convertedMinutes) &&
          convertedMinutes >= 0 &&
          convertedMinutes <= 99
        ) {
          dispatch(
            setTimeRemaining({
              minutes: convertedMinutes,
              seconds: timeRemaining.seconds,
            }),
          );
        }
        break;
      case 'seconds':
        const convertedSeconds = parseFloat(counterInputValues.seconds);
        if (
          !isNaN(convertedSeconds) &&
          convertedSeconds >= 0 &&
          convertedSeconds <= 59
        ) {
          dispatch(
            setTimeRemaining({
              minutes: timeRemaining.minutes,
              seconds: convertedSeconds,
            }),
          );
        }
    }
  };

  // Update the input values
  const counterInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    // Get id of the input
    const id = event.target.id;
    const value = event.target.value;

    if (timer.running === true) {
      dispatch(setRunning(false));
    }

    if (value.length <= 2) {
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
      if (
        (timeRemaining.minutes === 0 && timeRemaining.seconds === 0) ||
        timeRemaining.minutes < 0 ||
        timeRemaining.seconds < 0
      ) {
        // Skip forwards if minutes and seconds are 0
        // Skip forwards if minutes or seconds are less than 0 (user could input negative numbers)
        dispatch(setPomodoroCountForwards());
        notifyTimerFinished(timer);
        if (timer.settings.autoContinue === true) {
          dispatch(setRunning(true));
        }
        playDing();
      } else if (timeRemaining.seconds === 0) {
        // Subtract minute if seconds === 0
        dispatch(
          setTimeRemaining({
            minutes: timeRemaining.minutes - 1,
            seconds: 59,
          }),
        );
      } else {
        // Subtract second
        dispatch(
          setTimeRemaining({
            minutes: timeRemaining.minutes,
            seconds: timeRemaining.seconds - 1,
          }),
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
          inputMin="0"
          inputMax="99"
          inputValue={counterInputValues.minutes}
          changeHandler={counterInputChangeHandler}
          blurHandler={counterInputBlurHandler}
          clickHandler={() => {
            dispatch(setRunning(false));
          }}
        />
        <span className={styles['counter__colon']}>:</span>
        <CounterInput
          id="seconds"
          inputMin="0"
          inputMax="59"
          inputValue={counterInputValues.seconds}
          changeHandler={counterInputChangeHandler}
          blurHandler={counterInputBlurHandler}
          clickHandler={() => {
            dispatch(setRunning(false));
          }}
        />
      </div>
    </div>
  );
};
