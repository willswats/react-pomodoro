import { useReducer, useEffect } from 'react';

import InputMinutes from './InputMinutes';
import InputSeconds from './InputSeconds';
import ButtonStartStop from './ButtonStartStop';

import classes from './Timer.module.css';

export interface State {
  timerRunning: boolean;
  timeRemaining: {
    minutes: number;
    seconds: number;
  };
}

export interface Action {
  type: string;
  payload: State;
}

export const ACTIONS = {
  SET_TIMER_RUNNING: 'SET_TIMER_RUNNING',
  SET_TIME_REMAINING: 'SET_TIME_REMAINING',
};

const initialState: State = {
  timerRunning: false,
  timeRemaining: {
    minutes: 25,
    seconds: 0,
  },
};

const reducer = (state: State, { type, payload }: Action): State => {
  switch (type) {
    case ACTIONS.SET_TIMER_RUNNING:
      return {
        ...state,
        timerRunning: payload.timerRunning,
      };
    case ACTIONS.SET_TIME_REMAINING:
      return {
        ...state,
        timeRemaining: {
          minutes: payload.timeRemaining.minutes,
          seconds: payload.timeRemaining.seconds,
        },
      };
    default:
      return {
        ...state,
      };
  }
};

const Timer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { timerRunning, timeRemaining } = state;

  useEffect(() => {
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
  });

  return (
    <div className={classes['timer']}>
      <div className={classes['timer__inputs']}>
        <InputMinutes state={state} dispatch={dispatch} />
        <span className={classes['timer__colon']}>:</span>
        <InputSeconds state={state} dispatch={dispatch} />
      </div>
      <ButtonStartStop state={state} dispatch={dispatch} />
    </div>
  );
};

export default Timer;
