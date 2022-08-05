import { useEffect, Dispatch } from 'react';
import { State, Action, ACTIONS } from './Timer';

import convertTime from '../../helpers/convertTime';

import classes from './TimerCounter.module.css';

interface TimerCounterProps {
  state: State;
  dispatch: Dispatch<Action>;
}

const TimerCounter = ({ state, dispatch }: TimerCounterProps) => {
  const { timerRunning, timeRemaining, timerSettingsChanged } = state;

  useEffect(() => {
    // Change time when settings is changed
    if (timerRunning !== true && timerSettingsChanged === true) {
      dispatch({ type: ACTIONS.SET_TIME_REMAINING, payload: { ...state } });
    }

    // Timer logic
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
  }, [state, dispatch, timerRunning, timeRemaining, timerSettingsChanged]);

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
