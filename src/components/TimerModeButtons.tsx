import { Dispatch } from 'react';
import { State, Action, MODES } from './Timer';

import ModeButton from './UI/Buttons/ModeButton';

import classes from './TimerModeButtons.module.css';

interface TimerModeButtonsProps {
  state: State;
  dispatch: Dispatch<Action>;
}

const TimerModeButtons = ({ state, dispatch }: TimerModeButtonsProps) => {
  return (
    <div className={classes['timer-mode-btns']}>
      <ModeButton state={state} dispatch={dispatch} modeType={MODES.POMODORO} />
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
  );
};

export default TimerModeButtons;
