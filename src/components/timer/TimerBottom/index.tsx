import { useAppSelector } from 'store/hooks';

import TimerSkipBackwardsButton from 'components/timer/TimerSkipBackwardsButton';
import TimerPlayButton from 'components/timer/TimerPlayButton';
import TimerPauseButton from 'components/timer/TimerPauseButton';
import TimerSkipForwardsButton from 'components/timer/TimerSkipForwardsButton';

import styles from './styles.module.css';

const TimerBottom = () => {
  const timer = useAppSelector((state) => state.timer);

  return (
    <div className={styles['timer-bottom']}>
      <TimerSkipBackwardsButton />
      {timer.running === false ? <TimerPlayButton /> : <TimerPauseButton />}
      <TimerSkipForwardsButton />
    </div>
  );
};

export default TimerBottom;
