import { useReducer } from 'react';

import TimerTop from './TimerTop';
import TimerModeButtons from './TimerModeButtons';
import TimerCounter from './TimerCounter';
import TimerBottom from './TimerBottom';

import classes from './Timer.module.css';

export interface State {
  timerMode: string;
  timerRunning: boolean;
  timeRemaining: {
    minutes: number;
    seconds: number;
  };
  pomodoroCount: number;
  timerSettingsVisible: boolean;
  timerSettingsChanged: boolean;
  timerSettings: {
    pomodoroMinutes: number;
    shortBreakMinutes: number;
    longBreakMinutes: number;
    longBreakInterval: number;
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
  SET_POMODORO_COUNT = 'set-pomodoro-count',
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
  pomodoroCount: 0,
  timerSettingsVisible: false,
  timerSettingsChanged: false,
  timerSettings: {
    pomodoroMinutes: 25,
    shortBreakMinutes: 5,
    longBreakMinutes: 15,
    longBreakInterval: 5,
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
      // Change time when the settings are changed
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

      // Add to pomodoroCount.completed when pomodoro reaches 0
      if (
        state.timeRemaining.minutes === 0 &&
        state.timeRemaining.seconds === 0 &&
        state.timerMode === MODES.POMODORO
      ) {
        return {
          ...state,
          timerRunning: false,
          pomodoroCount: state.pomodoroCount + 1,
        };
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

    case ACTIONS.SET_POMODORO_COUNT:
      if (
        payload.pomodoroCount === state.pomodoroCount - 1 &&
        state.pomodoroCount > 0
      ) {
        switch (state.timerMode) {
          case MODES.POMODORO:
            return {
              ...state,
              timerMode: MODES.SHORT_BREAK,
              timeRemaining: {
                minutes: state.timerSettings.shortBreakMinutes,
                seconds: 0,
              },
            };
          case MODES.SHORT_BREAK:
            return {
              ...state,
              timerMode: MODES.POMODORO,
              timeRemaining: {
                minutes: state.timerSettings.pomodoroMinutes,
                seconds: 0,
              },
              pomodoroCount: payload.pomodoroCount,
            };
          case MODES.LONG_BREAK:
            return {
              ...state,
              timerMode: MODES.POMODORO,
              timeRemaining: {
                minutes: state.timerSettings.pomodoroMinutes,
                seconds: 0,
              },
              pomodoroCount: payload.pomodoroCount,
            };
        }
      }

      if (
        payload.pomodoroCount === state.pomodoroCount + 1 &&
        payload.pomodoroCount === state.timerSettings.longBreakInterval &&
        state.timerMode === MODES.POMODORO
      ) {
        return {
          ...state,
          timerMode: MODES.LONG_BREAK,
          timeRemaining: {
            minutes: state.timerSettings.longBreakMinutes,
            seconds: 0,
          },
          pomodoroCount: payload.pomodoroCount,
        };
      }

      if (
        payload.pomodoroCount === state.pomodoroCount + 1 &&
        state.pomodoroCount !== state.timerSettings.longBreakInterval
      ) {
        switch (state.timerMode) {
          case MODES.POMODORO:
            return {
              ...state,
              timerMode: MODES.SHORT_BREAK,
              timeRemaining: {
                minutes: state.timerSettings.shortBreakMinutes,
                seconds: 0,
              },
              pomodoroCount: payload.pomodoroCount,
            };
          case MODES.SHORT_BREAK:
            return {
              ...state,
              timerMode: MODES.POMODORO,
              timeRemaining: {
                minutes: state.timerSettings.pomodoroMinutes,
                seconds: 0,
              },
            };
          case MODES.LONG_BREAK:
            return {
              ...state,
              timerMode: MODES.POMODORO,
              timeRemaining: {
                minutes: state.timerSettings.pomodoroMinutes,
                seconds: 0,
              },
            };
        }
      }

      return {
        ...state,
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
          longBreakInterval: payload.timerSettings.pomodoroMinutes,
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

  console.log(state);

  return (
    <div className={classes['timer']}>
      <div className={classes['timer__content']}>
        <TimerTop state={state} dispatch={dispatch} />
        <TimerModeButtons state={state} dispatch={dispatch} />
        <TimerCounter state={state} dispatch={dispatch} />
        <TimerBottom state={state} dispatch={dispatch} />
      </div>
    </div>
  );
};

export default Timer;
