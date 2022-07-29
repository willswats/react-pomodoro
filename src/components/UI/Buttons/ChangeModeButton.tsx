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
  const { mode } = state;

  const clickHandler = () => {
    if (modeType === MODES.POMODORO) {
      dispatch({
        type: ACTIONS.SET_MODE,
        payload: { ...state, mode: MODES.POMODORO },
      });
    } else if (modeType === MODES.SHORT_BREAK) {
      dispatch({
        type: ACTIONS.SET_MODE,
        payload: { ...state, mode: MODES.SHORT_BREAK },
      });
    } else if (modeType === MODES.LONG_BREAK) {
      dispatch({
        type: ACTIONS.SET_MODE,
        payload: { ...state, mode: MODES.LONG_BREAK },
      });
    }
  };

  return (
    <button
      onClick={clickHandler}
      className={`${classes['change-mode-button']} ${
        mode === modeType ? classes['change-mode-button--active'] : ''
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
