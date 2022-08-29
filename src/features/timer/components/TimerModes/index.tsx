import { useAppDispatch, useAppSelector } from 'hooks';

import { TIMER_MODES, setMode } from 'features/timer';

import { ModeButton } from 'components';

import styles from './styles.module.css';

export const TimerModes = () => {
  const dispatch = useAppDispatch();
  const timer = useAppSelector((state) => state.timer);

  return (
    <div className={styles['timer-modes']}>
      <div className={styles['timer-modes__content']}>
        <ModeButton
          text="Pomodoro"
          buttonMode={TIMER_MODES.POMODORO}
          timerMode={timer.mode}
          clickHandler={() => dispatch(setMode(TIMER_MODES.POMODORO))}
        />
        <ModeButton
          text="Short Break"
          buttonMode={TIMER_MODES.SHORT_BREAK}
          timerMode={timer.mode}
          clickHandler={() => dispatch(setMode(TIMER_MODES.SHORT_BREAK))}
        />
        <ModeButton
          text="Long Break"
          buttonMode={TIMER_MODES.LONG_BREAK}
          timerMode={timer.mode}
          clickHandler={() => dispatch(setMode(TIMER_MODES.LONG_BREAK))}
        />
      </div>
    </div>
  );
};
