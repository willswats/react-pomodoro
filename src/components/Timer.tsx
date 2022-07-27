import { useReducer, useEffect } from 'react';

import ModeButton from './Buttons/ModeButton';
import TimerCounter from './TimerCounter';
import StartStopButton from './Buttons/StartStopButton';

import classes from './Timer.module.css';

export interface State {
  timerMode: string;
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
  SET_TIMER_MODE: 'set-timer-mode',
  SET_TIMER_RUNNING: 'set-timer-running',
  SET_TIME_REMAINING: 'set-time-remaining',
};

export const MODES = {
  POMODORO: 'pomodoro',
  SHORT_BREAK: 'short-break',
  LONG_BREAK: 'long-break',
};

const initialState: State = {
  timerMode: MODES.POMODORO,
  timerRunning: false,
  timeRemaining: {
    minutes: 25,
    seconds: 0,
  },
};

const reducer = (state: State, { type, payload }: Action): State => {
  switch (type) {
    case ACTIONS.SET_TIMER_MODE:
      return {
        ...state,
        timerMode: payload.timerMode,
      };
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
      <div className={classes['timer__content']}>
        <div className={classes['timer__mode-btns']}>
          <ModeButton
            state={state}
            dispatch={dispatch}
            modeType={MODES.POMODORO}
          />
          <ModeButton
            state={state}
            dispatch={dispatch}
            modeType={MODES.SHORT_BREAK}
          />
          <ModeButton
            state={state}
            dispatch={dispatch}
            modeType={MODES.LONG_BREAK}
          />
        </div>
        <TimerCounter state={state} />
        <div className={classes['timer__start-stop-btn']}>
          <StartStopButton state={state} dispatch={dispatch} />
        </div>
      </div>
    </div>
  );
};

export default Timer;
