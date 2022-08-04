import { useReducer } from 'react';

import TimerSettings from './TimerSettings';
import TimerModeBar from './TimerModeBar';
import TimerCounter from './TimerCounter';
import TimerStartStopButton from './TimerStartStopButton';

import classes from './Timer.module.css';

export interface State {
  timerMode: string;
  timerRunning: boolean;
  timeRemaining: {
    minutes: number;
    seconds: number;
  };
  timerSettingsVisible: boolean;
  timerSettingsChanged: boolean;
  timerSettings: {
    pomodoroMinutes: number;
    shortBreakMinutes: number;
    longBreakMinutes: number;
  };
}

export interface Action {
  type: string;
  payload: State;
}

export enum ACTIONS {
  SET_TIMER_MODE = 'set-timer-mode',
  SET_TIMER_RUNNING = 'set-timer-running',
  SET_TIME_REMAINING = 'set-time-remaining',
  SET_TIMER_SETTINGS_VISIBLE = 'set-timer-settings-visible',
  SET_TIMER_SETTINGS_CHANGED = 'set-timer-settings-changed',
  SET_TIMER_SETTINGS = 'set-timer-settings',
}

export enum MODES {
  POMODORO = 'pomodoro',
  SHORT_BREAK = 'short-break',
  LONG_BREAK = 'long-break',
}

const initialState: State = {
  timerMode: MODES.POMODORO,
  timerRunning: false,
  timeRemaining: {
    minutes: 25,
    seconds: 0,
  },
  timerSettingsVisible: false,
  timerSettingsChanged: false,
  timerSettings: {
    pomodoroMinutes: 25,
    shortBreakMinutes: 5,
    longBreakMinutes: 15,
  },
};

const reducer = (state: State, { type, payload }: Action): State => {
  switch (type) {
    case ACTIONS.SET_TIMER_MODE:
      return {
        ...state,
        timerMode: payload.timerMode,
        timerRunning: false,
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
    case ACTIONS.SET_TIMER_SETTINGS_VISIBLE:
      return {
        ...state,
        timerSettingsVisible: payload.timerSettingsVisible,
      };
    case ACTIONS.SET_TIMER_SETTINGS_CHANGED:
      return {
        ...state,
        timerSettingsChanged: payload.timerSettingsChanged,
      };
    case ACTIONS.SET_TIMER_SETTINGS:
      return {
        ...state,
        timerSettings: {
          pomodoroMinutes: payload.timerSettings.pomodoroMinutes,
          shortBreakMinutes: payload.timerSettings.shortBreakMinutes,
          longBreakMinutes: payload.timerSettings.longBreakMinutes,
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

  return (
    <div className={classes['timer']}>
      <div className={classes['timer__content']}>
        <TimerSettings state={state} dispatch={dispatch} />
        <TimerModeBar state={state} dispatch={dispatch} />
        <TimerCounter state={state} dispatch={dispatch} />
        <TimerStartStopButton state={state} dispatch={dispatch} />
      </div>
    </div>
  );
};

export default Timer;
