import { useAppDispatch, useAppSelector } from 'store/hooks';
import { setPomodoroCount } from 'store/timerSlice';

import Indicator from 'components/ui/Indicator';

import styles from './styles.module.css';

const TimerIndicators = () => {
  const dispatch = useAppDispatch();

  const timer = useAppSelector((state) => state.timer);
  const settings = useAppSelector((state) => state.timer.settings);

  const longBreakIntervalIds: string[] = [];
  for (let i = 0; i < settings.longBreakInterval; i++) {
    longBreakIntervalIds.push(`el${i}`);
  }

  return (
    <div className={styles['timer-indicators']}>
      {longBreakIntervalIds.map((id, index) => {
        const indicatorClickHandler = () => {
          dispatch(setPomodoroCount(index + 1));
        };

        return (
          <Indicator
            key={id}
            id={id}
            index={index}
            completed={timer.pomodoroCount}
            clickHandler={indicatorClickHandler}
          />
        );
      })}
    </div>
  );
};

export default TimerIndicators;
