import { Dispatch } from 'react';
import { State, Action, ACTIONS, MODES } from './Timer';

import ModeButton from '../UI/Buttons/ModeButton';

import classes from './TimerModeBar.module.css';

interface TimerModeBarProps {
  state: State;
  dispatch: Dispatch<Action>;
}

const TimerModeBar = ({ state, dispatch }: TimerModeBarProps) => {
  const { timerMode, timerSettings } = state;

  const pomodoroModeButtonClickHandler = () => {
    dispatch({
      type: ACTIONS.SET_TIMER_MODE,
      payload: { ...state, timerMode: MODES.POMODORO },
    });
    dispatch({
      type: ACTIONS.SET_TIME_REMAINING,
      payload: {
        ...state,
        timeRemaining: { minutes: timerSettings.pomodoroMinutes, seconds: 0 },
      },
    });
  };

  const shortBreakModeButtonClickHandler = () => {
    dispatch({
      type: ACTIONS.SET_TIMER_MODE,
      payload: { ...state, timerMode: MODES.SHORT_BREAK },
    });
    dispatch({
      type: ACTIONS.SET_TIME_REMAINING,
      payload: {
        ...state,
        timeRemaining: { minutes: timerSettings.shortBreakMinutes, seconds: 0 },
      },
    });
  };

  const longBreakModeButtonClickHandler = () => {
    dispatch({
      type: ACTIONS.SET_TIMER_MODE,
      payload: { ...state, timerMode: MODES.LONG_BREAK },
    });
    dispatch({
      type: ACTIONS.SET_TIME_REMAINING,
      payload: {
        ...state,
        timeRemaining: { minutes: timerSettings.longBreakMinutes, seconds: 0 },
      },
    });
  };

  return (
    <div className={classes['timer-mode-bar']}>
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

export default TimerModeBar;
