import { useAppDispatch, useAppSelector } from 'hooks';

import { setPomodoroCount } from 'features/timer';

import Indicator from 'components/Indicator';

import styles from './styles.module.css';

export const TimerIndicators = () => {
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
