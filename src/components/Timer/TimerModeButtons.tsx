import { Dispatch } from 'react';
import { State, Action, ACTIONS, MODES } from './Timer';

import ModeButton from '../UI/Buttons/ModeButton';

import classes from './TimerModeButtons.module.css';

interface TimerModeButtonsProps {
  state: State;
  dispatch: Dispatch<Action>;
}

const TimerModeButtons = ({ state, dispatch }: TimerModeButtonsProps) => {
  const { timerMode } = state;

  const pomodoroModeButtonClickHandler = () => {
    if (timerMode !== MODES.POMODORO) {
      dispatch({
        type: ACTIONS.SET_TIMER_MODE,
        payload: { ...state, timerMode: MODES.POMODORO },
      });
    }
  };

  const shortBreakModeButtonClickHandler = () => {
    if (timerMode !== MODES.SHORT_BREAK) {
      dispatch({
        type: ACTIONS.SET_TIMER_MODE,
        payload: { ...state, timerMode: MODES.SHORT_BREAK },
      });
    }
  };

  const longBreakModeButtonClickHandler = () => {
    if (timerMode !== MODES.LONG_BREAK) {
      dispatch({
        type: ACTIONS.SET_TIMER_MODE,
        payload: { ...state, timerMode: MODES.LONG_BREAK },
      });
    }
  };

  return (
    <div className={classes['timer-mode-buttons']}>
      <ModeButton
        text="Pomodoro"
        buttonMode={MODES.POMODORO}
        timerMode={timerMode}
        clickHandler={pomodoroModeButtonClickHandler}
      />
      <ModeButton
        text="Short Break"
        buttonMode={MODES.SHORT_BREAK}
        timerMode={timerMode}
        clickHandler={shortBreakModeButtonClickHandler}
      />
      <ModeButton
        text="Long Break"
        buttonMode={MODES.LONG_BREAK}
        timerMode={timerMode}
        clickHandler={longBreakModeButtonClickHandler}
      />
    </div>
  );
};

export default TimerModeButtons;
