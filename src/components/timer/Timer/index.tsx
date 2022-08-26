import TimerRestartButton from 'components/timer/TimerRestartButton';
import TimerIndicators from 'components/timer/TimerIndicators';
import TimerSettingsButton from 'components/timer/TimerSettingsButton';

import TimerModes from '../TimerModes';
import TimerCounter from '../TimerCounter';

import TimerSkipBackwardsButton from 'components/timer/TimerSkipBackwardsButton';
import TimerPlayButton from 'components/timer/TimerPlayButton';
import TimerPauseButton from 'components/timer/TimerPauseButton';
import TimerSkipForwardsButton from 'components/timer/TimerSkipForwardsButton';

import TimerSettingsForm from 'components/timer/TimerSettingsForm';

import { useAppSelector } from 'hooks';

import styles from './styles.module.css';

const Timer = () => {
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

export default Timer;
