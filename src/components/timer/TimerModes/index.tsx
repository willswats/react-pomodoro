import { useAppDispatch, useAppSelector } from 'store/hooks';
import { TIMER_MODES, setMode } from 'store/timerSlice';

import ModeButton from 'components/ui/ModeButton';

import styles from './styles.module.css';

const TimerModes = () => {
  const dispatch = useAppDispatch();
  const timer = useAppSelector((state) => state.timer);

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
    <div className={styles['timer-modes']}>
      <div className={styles['timer-modes__content']}>
        <ModeButton
          text="Pomodoro"
          buttonMode={TIMER_MODES.POMODORO}
          timerMode={timer.mode}
          clickHandler={pomodoroModeButtonClickHandler}
        />
        <ModeButton
          text="Short Break"
          buttonMode={TIMER_MODES.SHORT_BREAK}
          timerMode={timer.mode}
          clickHandler={shortBreakModeButtonClickHandler}
        />
        <ModeButton
          text="Long Break"
          buttonMode={TIMER_MODES.LONG_BREAK}
          timerMode={timer.mode}
          clickHandler={longBreakModeButtonClickHandler}
        />
      </div>
    </div>
  );
};

export default TimerModes;
