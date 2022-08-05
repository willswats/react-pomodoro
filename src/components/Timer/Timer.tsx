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
      switch (payload.timerMode) {
        case MODES.POMODORO:
          return {
            ...state,
            timerMode: payload.timerMode,
            timerRunning: false,
            timeRemaining: {
              minutes: state.timerSettings.pomodoroMinutes,
              seconds: 0,
            },
          };
        case MODES.SHORT_BREAK:
          return {
            ...state,
            timerMode: payload.timerMode,
            timerRunning: false,
            timeRemaining: {
              minutes: state.timerSettings.shortBreakMinutes,
              seconds: 0,
            },
          };
        case MODES.LONG_BREAK:
          return {
            ...state,
            timerMode: payload.timerMode,
            timerRunning: false,
            timeRemaining: {
              minutes: state.timerSettings.longBreakMinutes,
              seconds: 0,
            },
          };
      }
      return {
        ...state,
      };
    case ACTIONS.SET_TIMER_RUNNING:
      // Prevent start if minutes and seconds are 0
      if (
        state.timeRemaining.minutes === 0 &&
        state.timeRemaining.seconds === 0
      ) {
        return {
          ...state,
        };
      }
      return {
        ...state,
        timerRunning: payload.timerRunning,
      };
    case ACTIONS.SET_TIME_REMAINING:
      // Change time when settings is changed
      if (state.timerRunning !== true && state.timerSettingsChanged === true) {
        switch (state.timerMode) {
          case MODES.POMODORO:
            return {
              ...state,
              timerSettingsChanged: false,
              timeRemaining: {
                minutes: state.timerSettings.pomodoroMinutes,
                seconds: 0,
              },
            };
          case MODES.SHORT_BREAK:
            return {
              ...state,
              timerSettingsChanged: false,
              timeRemaining: {
                minutes: state.timerSettings.shortBreakMinutes,
                seconds: 0,
              },
            };
          case MODES.LONG_BREAK:
            return {
              ...state,
              timerSettingsChanged: false,
              timeRemaining: {
                minutes: state.timerSettings.longBreakMinutes,
                seconds: 0,
              },
            };
        }
      }
      // Stop timer when minutes and seconds are 0
      if (
        state.timeRemaining.minutes === 0 &&
        state.timeRemaining.seconds === 0
      ) {
        return {
          ...state,
          timerRunning: false,
        };
      }
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
        timerRunning: false,
      };
    case ACTIONS.SET_TIMER_SETTINGS:
      return {
        ...state,
        timerSettingsVisible: false,
        timerSettingsChanged: true,
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
