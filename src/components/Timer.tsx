import { useReducer } from 'react';

import ChangeModeButton from './UI/Buttons/ChangeModeButton';
import StartStopButton from './UI/Buttons/StartStopButton';
import ShowSettingsButton from './UI/Buttons/ShowSettingsButton';
import SettingsOverlay from './UI/SettingsOverlay';
import SettingsForm from './UI/SettingsForm';
import TimerCounter from './TimerCounter';

import classes from './Timer.module.css';

export interface State {
  timerMode: string;
  timerRunning: boolean;
  timeRemaining: {
    minutes: number;
    seconds: number;
  };
  timerSettingsVisible: boolean;
  timerSettings: {
    pomodoro: number;
    shortBreak: number;
    longBreak: number;
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
  SET_TIMER_SETTINGS_VISIBLE: 'set-timer-settings-visible',
  SET_TIMER_SETTINGS: 'set-timer-settings',
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
  timerSettingsVisible: false,
  timerSettings: {
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15,
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
    case ACTIONS.SET_TIMER_SETTINGS:
      return {
        ...state,
        timerSettings: {
          pomodoro: payload.timerSettings.pomodoro,
          shortBreak: payload.timerSettings.shortBreak,
          longBreak: payload.timerSettings.longBreak,
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

  const { timerSettingsVisible } = state;

  return (
    <div className={classes['timer']}>
      <div className={classes['timer__content']}>
        <div className={classes['timer__settings-button']}>
          <ShowSettingsButton state={state} dispatch={dispatch} />
        </div>
        {timerSettingsVisible && (
          <SettingsOverlay
            state={state}
            dispatch={dispatch}
            settingsElement={<SettingsForm state={state} dispatch={dispatch} />}
          />
        )}
        <div className={classes['timer__mode-buttons']}>
          <ChangeModeButton
            state={state}
            dispatch={dispatch}
            modeType={MODES.POMODORO}
          />
          <ChangeModeButton
            state={state}
            dispatch={dispatch}
            modeType={MODES.SHORT_BREAK}
          />
          <ChangeModeButton
            state={state}
            dispatch={dispatch}
            modeType={MODES.LONG_BREAK}
          />
        </div>
        <TimerCounter state={state} dispatch={dispatch} />
        <div className={classes['timer__start-stop-buttons']}>
          <StartStopButton state={state} dispatch={dispatch} />
        </div>
      </div>
    </div>
  );
};

export default Timer;
