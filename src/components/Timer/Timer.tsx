import TimerRestartButton from './Buttons/TimerRestartButton';
import TimerIndicators from './TimerIndicators';
import TimerSettings from './TimerSettings';
import TimerModes from './TimerModes';
import TimerCounter from './TimerCounter';
import TimerControls from './TimerControls';

import classes from './Timer.module.css';

const Timer = () => {
  return (
    <div className={classes['timer']}>
      <div className={classes['timer__top']}>
        <TimerRestartButton />
        <TimerIndicators />
        <TimerSettings />
      </div>
      <div className={classes['timer__middle']}>
        <TimerModes />
        <TimerCounter />
      </div>
      <TimerControls />
    </div>
  );
};

export default Timer;
