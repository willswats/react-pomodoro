import TimerTop from './TimerTop';
import TimerModes from './TimerModes';
import TimerCounter from './TimerCounter';
import TimerControls from './TimerControls';

import classes from './Timer.module.css';

const Timer = () => {
  return (
    <div className={classes['timer']}>
      <div className={classes['timer__content']}>
        <TimerTop />
        <TimerModes />
        <TimerCounter />
        <TimerControls />
      </div>
    </div>
  );
};

export default Timer;
