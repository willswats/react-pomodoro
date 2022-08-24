import { useAppSelector } from '../../store/hooks';

import TimerSkipBackwardsButton from './Buttons/TimerSkipBackwardsButton';
import TimerPlayButton from './Buttons/TimerPlayButton';
import TimerPauseButton from './Buttons/TimerPauseButton';
import TimerSkipForwardsButton from './Buttons/TimerSkipForwardsButton';

import classes from './TimerBottom.module.css';

const TimerBottom = () => {
  const timer = useAppSelector((state) => state.timer);

  return (
    <div className={classes['timer-bottom']}>
      <TimerSkipBackwardsButton />
      {timer.running === false ? <TimerPlayButton /> : <TimerPauseButton />}
      <TimerSkipForwardsButton />
    </div>
  );
};

export default TimerBottom;
