import { useReducer, useEffect } from 'react';

import ChangeModeButton from './UI/Buttons/ChangeModeButton';
import StartStopButton from './UI/Buttons/StartStopButton';
import ShowSettingsButton from './UI/Buttons/ShowSettingsButton';
import SettingsOverlay from './UI/SettingsOverlay';
import SettingsForm from './UI/SettingsForm';

import convertTime from '../helpers/convertTime';

import classes from './Timer.module.css';

export interface State {
  mode: string;
  running: boolean;
  counters: {
    pomodoro: {
      minutes: number;
      seconds: number;
    };
    shortBreak: {
      minutes: number;
      seconds: number;
    };
    longBreak: {
      minutes: number;
      seconds: number;
    };
  };
  settingsVisible: boolean;
  settings: {
    counters: {
      pomodoro: {
        minutes: number;
        seconds: number;
      };
      shortBreak: {
        minutes: number;
        seconds: number;
      };
      longBreak: {
        minutes: number;
        seconds: number;
      };
    };
  };
}

export interface Action {
  type: string;
  payload: State;
}

export const ACTIONS = {
  SET_MODE: 'set-mode',
  SET_RUNNING: 'set-running',
  SET_COUNTERS: 'set-counters',
  SET_SETTINGS_VISIBLE: 'set-settings-visible',
  SET_SETTINGS: 'set-settings',
};

export const MODES = {
  POMODORO: 'pomodoro',
  SHORT_BREAK: 'short-break',
  LONG_BREAK: 'long-break',
};

const initialState: State = {
  mode: MODES.POMODORO,
  running: false,
  counters: {
    pomodoro: {
      minutes: 25,
      seconds: 0,
    },
    shortBreak: {
      minutes: 5,
      seconds: 0,
    },
    longBreak: {
      minutes: 15,
      seconds: 0,
    },
  },
  settingsVisible: false,
  settings: {
    counters: {
      pomodoro: {
        minutes: 25,
        seconds: 0,
      },
      shortBreak: {
        minutes: 5,
        seconds: 0,
      },
      longBreak: {
        minutes: 15,
        seconds: 0,
      },
    },
  },
};

const reducer = (state: State, { type, payload }: Action): State => {
  switch (type) {
    case ACTIONS.SET_MODE:
      return {
        ...state,
        mode: payload.mode,
        running: false,
        counters: {
          pomodoro: {
            minutes: state.settings.counters.pomodoro.minutes,
            seconds: state.settings.counters.pomodoro.seconds,
          },
          shortBreak: {
            minutes: state.settings.counters.shortBreak.minutes,
            seconds: state.settings.counters.shortBreak.seconds,
          },
          longBreak: {
            minutes: state.settings.counters.longBreak.minutes,
            seconds: state.settings.counters.longBreak.seconds,
          },
        },
      };
    case ACTIONS.SET_RUNNING:
      return {
        ...state,
        running: payload.running,
      };
    case ACTIONS.SET_SETTINGS_VISIBLE:
      return {
        ...state,
        settingsVisible: payload.settingsVisible,
      };
    case ACTIONS.SET_COUNTERS:
      return {
        ...state,
        counters: {
          pomodoro: {
            minutes: payload.counters.pomodoro.minutes,
            seconds: payload.counters.pomodoro.seconds,
          },
          shortBreak: {
            minutes: payload.counters.shortBreak.minutes,
            seconds: payload.counters.shortBreak.seconds,
          },
          longBreak: {
            minutes: payload.counters.longBreak.minutes,
            seconds: payload.counters.longBreak.seconds,
          },
        },
      };
    case ACTIONS.SET_SETTINGS:
      return {
        ...state,
        settings: {
          counters: {
            pomodoro: {
              minutes: payload.settings.counters.pomodoro.minutes,
              seconds: payload.settings.counters.pomodoro.seconds,
            },
            shortBreak: {
              minutes: payload.settings.counters.shortBreak.minutes,
              seconds: payload.settings.counters.shortBreak.seconds,
            },
            longBreak: {
              minutes: payload.settings.counters.longBreak.minutes,
              seconds: payload.settings.counters.longBreak.seconds,
            },
          },
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

  const { mode, running, settingsVisible } = state;
  const { pomodoro, shortBreak, longBreak } = state.counters;

  console.log(state);

  useEffect(() => {
    if (
      (pomodoro.minutes === 0 && pomodoro.seconds === 0) ||
      (shortBreak.minutes === 0 && shortBreak.seconds === 0) ||
      (longBreak.minutes === 0 && longBreak.seconds === 0)
    ) {
      dispatch({
        type: ACTIONS.SET_RUNNING,
        payload: { ...state, running: false },
      });
    }

    if (mode === MODES.POMODORO) {
      const intervalId = setInterval(() => {
        if (pomodoro.seconds === 0) {
          dispatch({
            type: ACTIONS.SET_COUNTERS,
            payload: {
              ...state,
              counters: {
                ...state.counters,
                pomodoro: {
                  minutes: pomodoro.minutes - 1,
                  seconds: 59,
                },
              },
            },
          });
        } else {
          dispatch({
            type: ACTIONS.SET_COUNTERS,
            payload: {
              ...state,
              counters: {
                ...state.counters,
                pomodoro: {
                  ...state.counters.pomodoro,
                  seconds: pomodoro.seconds - 1,
                },
              },
            },
          });
        }
      }, 1000);

      if (running === false) {
        clearInterval(intervalId);
      }

      return () => {
        clearInterval(intervalId);
      };
    } else if (mode === MODES.SHORT_BREAK) {
      const intervalId = setInterval(() => {
        if (shortBreak.seconds === 0) {
          dispatch({
            type: ACTIONS.SET_COUNTERS,
            payload: {
              ...state,
              counters: {
                ...state.counters,
                shortBreak: {
                  minutes: shortBreak.minutes - 1,
                  seconds: 59,
                },
              },
            },
          });
        } else {
          dispatch({
            type: ACTIONS.SET_COUNTERS,
            payload: {
              ...state,
              counters: {
                ...state.counters,
                shortBreak: {
                  ...state.counters.shortBreak,
                  seconds: shortBreak.seconds - 1,
                },
              },
            },
          });
        }
      }, 1000);

      if (running === false) {
        clearInterval(intervalId);
      }

      return () => {
        clearInterval(intervalId);
      };
    } else if (mode === MODES.LONG_BREAK) {
      const intervalId = setInterval(() => {
        if (longBreak.seconds === 0) {
          dispatch({
            type: ACTIONS.SET_COUNTERS,
            payload: {
              ...state,
              counters: {
                ...state.counters,
                longBreak: {
                  minutes: longBreak.minutes - 1,
                  seconds: 59,
                },
              },
            },
          });
        } else {
          dispatch({
            type: ACTIONS.SET_COUNTERS,
            payload: {
              ...state,
              counters: {
                ...state.counters,
                longBreak: {
                  ...state.counters.longBreak,
                  seconds: longBreak.seconds - 1,
                },
              },
            },
          });
        }
      }, 1000);

      if (running === false) {
        clearInterval(intervalId);
      }

      return () => {
        clearInterval(intervalId);
      };
    }
  });

  return (
    <div className={classes['timer']}>
      <div className={classes['timer__content']}>
        <div className={classes['timer__settings-button']}>
          <ShowSettingsButton state={state} dispatch={dispatch} />
        </div>
        {settingsVisible && (
          <SettingsOverlay
            state={state}
            dispatch={dispatch}
            settingsElement={<SettingsForm />}
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
        <div className={classes['timer__counter']}>
          <div className={classes['timer__counter-content']}>
            {mode === MODES.POMODORO && <p>{convertTime(pomodoro.minutes)}</p>}
            {mode === MODES.SHORT_BREAK && (
              <p>{convertTime(shortBreak.minutes)}</p>
            )}
            {mode === MODES.LONG_BREAK && (
              <p>{convertTime(longBreak.minutes)}</p>
            )}
            <span className={classes['timer__counter-colon']}>:</span>
            {mode === MODES.POMODORO && <p>{convertTime(pomodoro.seconds)}</p>}
            {mode === MODES.SHORT_BREAK && (
              <p>{convertTime(shortBreak.seconds)}</p>
            )}
            {mode === MODES.LONG_BREAK && (
              <p>{convertTime(longBreak.seconds)}</p>
            )}
          </div>
        </div>
        <div className={classes['timer__start-stop-buttons']}>
          <StartStopButton state={state} dispatch={dispatch} />
        </div>
      </div>
    </div>
  );
};

export default Timer;
