import { useReducer, useEffect } from 'react';

import InputMinutes from './InputMinutes';
import InputSeconds from './InputSeconds';
import ButtonStartStop from './ButtonStartStop';

import classes from './Timer.module.css';

export interface State {
  running: boolean;
  minutes: number;
  seconds: number;
}

export interface Action {
  type: string;
  payload: State;
}

export const ACTIONS = {
  SET_RUNNING: 'SET_RUNNING',
  SET_MINUTES: 'SET_MINUTES',
  SET_SECONDS: 'SET_SECONDS',
};

const initialState: State = {
  running: false,
  minutes: 25,
  seconds: 0,
};

const reducer = (state: State, { type, payload }: Action): State => {
  switch (type) {
    case ACTIONS.SET_RUNNING:
      return {
        ...state,
        running: payload.running,
      };
    case ACTIONS.SET_MINUTES:
      return {
        ...state,
        minutes: payload.minutes,
      };
    case ACTIONS.SET_SECONDS:
      return {
        ...state,
        seconds: payload.seconds,
      };
    default:
      return {
        ...state,
      };
  }
};

const Timer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (state.minutes === 0 && state.seconds === 0) {
        dispatch({
          type: ACTIONS.SET_RUNNING,
          payload: { ...state, running: false },
        });
      } else if (state.seconds === 0) {
        dispatch({
          type: ACTIONS.SET_MINUTES,
          payload: { ...state, minutes: state.minutes - 1 },
        });
        dispatch({
          type: ACTIONS.SET_SECONDS,
          payload: { ...state, seconds: 60 },
        });
      } else {
        dispatch({
          type: ACTIONS.SET_SECONDS,
          payload: { ...state, seconds: state.seconds - 1 },
        });
      }
    }, 1000);

    if (state.running === false) {
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
