import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { TIMER_MODES, setMode } from '../../store/timerSlice';

import ModeButton from '../UI/Buttons/ModeButton';

import classes from './TimerModes.module.css';

const TimerModes = () => {
  const dispatch = useAppDispatch();
  const mode = useAppSelector((state) => state.timer.mode);

  const pomodoroModeButtonClickHandler = () => {
    dispatch(setMode(TIMER_MODES.POMODORO));
  };

  const shortBreakModeButtonClickHandler = () => {
    dispatch(setMode(TIMER_MODES.SHORT_BREAK));
  };

  const longBreakModeButtonClickHandler = () => {
    dispatch(setMode(TIMER_MODES.LONG_BREAK));
  };

  return (
    <div className={classes['timer-modes']}>
      <ModeButton
        text="Pomodoro"
        buttonMode={TIMER_MODES.POMODORO}
        timerMode={mode}
        clickHandler={pomodoroModeButtonClickHandler}
      />
      <ModeButton
        text="Short Break"
        buttonMode={TIMER_MODES.SHORT_BREAK}
        timerMode={mode}
        clickHandler={shortBreakModeButtonClickHandler}
      />
      <ModeButton
        text="Long Break"
        buttonMode={TIMER_MODES.LONG_BREAK}
        timerMode={mode}
        clickHandler={longBreakModeButtonClickHandler}
      />
    </div>
  );
};

export default TimerModes;
