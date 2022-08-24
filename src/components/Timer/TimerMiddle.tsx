import TimerModes from './TimerModes';
import TimerCounter from './TimerCounter';

import classes from './TimerMiddle.module.css';

const TimerMiddle = () => {
  return (
    <div className={classes['timer-middle']}>
      <TimerModes />
      <TimerCounter />
    </div>
  );
};

export default TimerMiddle;
