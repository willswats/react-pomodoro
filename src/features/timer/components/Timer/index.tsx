import {
  TimerRestartButton,
  TimerIndicators,
  TimerSettingsButton,
  TimerModes,
  TimerCounter,
  TimerSkipBackwardsButton,
  TimerPlayButton,
  TimerPauseButton,
  TimerSkipForwardsButton,
  TimerSettingsForm,
} from 'features/timer';

import { useAppSelector } from 'hooks';

import styles from './styles.module.css';

export const Timer = () => {
  const timer = useAppSelector((state) => state.timer);

  return (
    <div className={styles['timer']}>
      <div className={styles['timer__content']}>
        {!timer.settingsVisible ? (
          <>
            <div className={styles['timer__top']}>
              <TimerRestartButton />
              <TimerIndicators />
              <TimerSettingsButton />
            </div>
            <div className={styles['timer__middle']}>
              <TimerModes />
              <TimerCounter />
            </div>
            <div className={styles['timer__bottom']}>
              <TimerSkipBackwardsButton />
              {timer.running === false ? (
                <TimerPlayButton />
              ) : (
                <TimerPauseButton />
              )}
              <TimerSkipForwardsButton />
            </div>
          </>
        ) : (
          <TimerSettingsForm />
        )}
      </div>
    </div>
  );
};
