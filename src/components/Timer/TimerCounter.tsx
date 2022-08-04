import { useEffect, Dispatch } from 'react';
import { State, Action, ACTIONS, MODES } from './Timer';

import convertTime from '../../helpers/convertTime';

import classes from './TimerCounter.module.css';

interface TimerCounterProps {
  state: State;
  dispatch: Dispatch<Action>;
}

const TimerCounter = ({ state, dispatch }: TimerCounterProps) => {
  const {
    timerRunning,
    timeRemaining,
    timerMode,
    timerSettings,
    timerSettingsChanged,
  } = state;

  useEffect(() => {
    // Change time when settings is changed
    if (timerRunning !== true && timerSettingsChanged === true) {
      switch (timerMode) {
        case MODES.POMODORO:
          if (timeRemaining.minutes !== timerSettings.pomodoroMinutes) {
            dispatch({
              type: ACTIONS.SET_TIME_REMAINING,
              payload: {
                ...state,
                timeRemaining: {
                  minutes: timerSettings.pomodoroMinutes,
                  seconds: 0,
                },
              },
            });
          }
          dispatch({
            type: ACTIONS.SET_TIMER_SETTINGS_CHANGED,
            payload: { ...state, timerSettingsChanged: false },
          });
          break;
        case MODES.SHORT_BREAK:
          if (timeRemaining.minutes !== timerSettings.shortBreakMinutes) {
            dispatch({
              type: ACTIONS.SET_TIME_REMAINING,
              payload: {
                ...state,
                timeRemaining: {
                  minutes: timerSettings.shortBreakMinutes,
                  seconds: 0,
                },
              },
            });
          }
          dispatch({
            type: ACTIONS.SET_TIMER_SETTINGS_CHANGED,
            payload: { ...state, timerSettingsChanged: false },
          });
          break;
        case MODES.LONG_BREAK:
          if (timeRemaining.minutes !== timerSettings.longBreakMinutes) {
            dispatch({
              type: ACTIONS.SET_TIME_REMAINING,
              payload: {
                ...state,
                timeRemaining: {
                  minutes: timerSettings.longBreakMinutes,
                  seconds: 0,
                },
              },
            });
          }
          dispatch({
            type: ACTIONS.SET_TIMER_SETTINGS_CHANGED,
            payload: { ...state, timerSettingsChanged: false },
          });
          break;
      }
    }

    // Timer
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
  }, [
    state,
    dispatch,
    timerRunning,
    timeRemaining,
    timerMode,
    timerSettings,
    timerSettingsChanged,
  ]);

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
