import { useEffect, Dispatch } from 'react';
import { State, Action, ACTIONS, MODES } from './Timer';

import convertTime from '../../helpers/convertTime';

import classes from './TimerCounter.module.css';

interface TimerCounterProps {
  state: State;
  dispatch: Dispatch<Action>;
}

const TimerCounter = ({ state, dispatch }: TimerCounterProps) => {
  const { timerRunning, timeRemaining, timerMode, timerSettings } = state;

  useEffect(() => {
    if (
      timerMode === MODES.POMODORO &&
      timeRemaining.minutes !== timerSettings.pomodoro
    ) {
      dispatch({
        type: ACTIONS.SET_TIME_REMAINING,
        payload: {
          ...state,
          timeRemaining: { minutes: timerSettings.pomodoro, seconds: 0 },
        },
      });
    } else if (
      timerMode === MODES.SHORT_BREAK &&
      timeRemaining.minutes !== timerSettings.shortBreak
    ) {
      dispatch({
        type: ACTIONS.SET_TIME_REMAINING,
        payload: {
          ...state,
          timeRemaining: { minutes: timerSettings.shortBreak, seconds: 0 },
        },
      });
    } else if (
      timerMode === MODES.LONG_BREAK &&
      timeRemaining.minutes !== timerSettings.longBreak
    ) {
      dispatch({
        type: ACTIONS.SET_TIME_REMAINING,
        payload: {
          ...state,
          timeRemaining: { minutes: timerSettings.longBreak, seconds: 0 },
        },
      });
    }

    if (timeRemaining.minutes === 0 && timeRemaining.seconds === 0) {
      dispatch({
        type: ACTIONS.SET_TIMER_RUNNING,
        payload: { ...state, timerRunning: false },
      });
    }
    const intervalId = setInterval(() => {
      if (timeRemaining.seconds === 0) {
        dispatch({
          type: ACTIONS.SET_TIME_REMAINING,
          payload: {
            ...state,
            timeRemaining: {
              minutes: timeRemaining.minutes - 1,
              seconds: 59,
            },
          },
        });
      } else {
        dispatch({
          type: ACTIONS.SET_TIME_REMAINING,
          payload: {
            ...state,
            timeRemaining: {
              ...timeRemaining,
              seconds: timeRemaining.seconds - 1,
            },
          },
        });
      }
    }, 1000);

    if (timerRunning === false) {
      clearInterval(intervalId);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [state, dispatch, timerRunning, timeRemaining, timerMode, timerSettings]);

  return (
    <div className={classes['counter']}>
      <div className={classes['counter__content']}>
        <p>{convertTime(timeRemaining.minutes)}</p>
        <span className={classes['counter__colon']}>:</span>
        <p>{convertTime(timeRemaining.seconds)}</p>
      </div>
    </div>
  );
};

export default TimerCounter;
