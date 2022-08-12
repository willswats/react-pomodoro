import { useAppDispatch, useAppSelector } from '../../store/hooks';

import { MODES } from '../../store/timerSlice';
import ModeButton from '../UI/Buttons/ModeButton';

import classes from './TimerModeButtons.module.css';

import { setMode } from '../../store/timerSlice';

const TimerModeButtons = () => {
  const dispatch = useAppDispatch();
  const mode = useAppSelector((state) => state.timer.mode);

  const pomodoroModeButtonClickHandler = () => {
    dispatch(setMode(MODES.POMODORO));
  };

  const shortBreakModeButtonClickHandler = () => {
    dispatch(setMode(MODES.SHORT_BREAK));
  };

  const longBreakModeButtonClickHandler = () => {
    dispatch(setMode(MODES.LONG_BREAK));
  };

  return (
    <div className={classes['timer-mode-buttons']}>
      <ModeButton
        text="Pomodoro"
        buttonMode={MODES.POMODORO}
        timerMode={mode}
        clickHandler={pomodoroModeButtonClickHandler}
      />
      <ModeButton
        text="Short Break"
        buttonMode={MODES.SHORT_BREAK}
        timerMode={mode}
        clickHandler={shortBreakModeButtonClickHandler}
      />
      <ModeButton
        text="Long Break"
        buttonMode={MODES.LONG_BREAK}
        timerMode={mode}
        clickHandler={longBreakModeButtonClickHandler}
      />
    </div>
  );
};

export default TimerModeButtons;
