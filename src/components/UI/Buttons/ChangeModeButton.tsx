import { Dispatch } from 'react';
import { State, Action, ACTIONS, MODES } from '../../Timer';

import classes from './ChangeModeButton.module.css';

interface ChangeModeButtonProps {
  state: State;
  dispatch: Dispatch<Action>;
  modeType: string;
}

const ChangeModeButton = ({
  state,
  dispatch,
  modeType,
}: ChangeModeButtonProps) => {
  const { timerMode } = state;

  const clickHandler = () => {
    if (modeType === MODES.POMODORO) {
      dispatch({
        type: ACTIONS.SET_TIMER_MODE,
        payload: { ...state, timerMode: MODES.POMODORO },
      });
      dispatch({
        type: ACTIONS.SET_TIME_REMAINING,
        payload: { ...state, timeRemaining: { minutes: 25, seconds: 0 } },
      });
    } else if (modeType === MODES.SHORT_BREAK) {
      dispatch({
        type: ACTIONS.SET_TIMER_MODE,
        payload: { ...state, timerMode: MODES.SHORT_BREAK },
      });
      dispatch({
        type: ACTIONS.SET_TIME_REMAINING,
        payload: { ...state, timeRemaining: { minutes: 5, seconds: 0 } },
      });
    } else if (modeType === MODES.LONG_BREAK) {
      dispatch({
        type: ACTIONS.SET_TIMER_MODE,
        payload: { ...state, timerMode: MODES.LONG_BREAK },
      });
      dispatch({
        type: ACTIONS.SET_TIME_REMAINING,
        payload: { ...state, timeRemaining: { minutes: 15, seconds: 0 } },
      });
    }
  };

  return (
    <button
      onClick={clickHandler}
      className={`${classes['change-mode-button']} ${
        timerMode === modeType ? classes['change-mode-button--active'] : ''
      }`}
    >
      {modeType === MODES.POMODORO
        ? 'Pomodoro'
        : modeType === MODES.SHORT_BREAK
        ? 'Short Break'
        : modeType === MODES.LONG_BREAK
        ? 'Long Break'
        : ''}
    </button>
  );
};

export default ChangeModeButton;
