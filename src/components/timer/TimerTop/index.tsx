import TimerRestartButton from 'components/timer/TimerRestartButton';
import TimerIndicators from 'components/timer/TimerIndicators';
import TimerSettingsButton from 'components/timer/TimerSettingsButton';

import styles from './styles.module.css';

const TimerTop = () => {
  return (
    <div className={styles['timer-top']}>
      <TimerRestartButton />
      <TimerIndicators />
      <TimerSettingsButton />
    </div>
  );
};

export default TimerTop;
