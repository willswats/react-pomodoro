import TimerRestartButton from './Buttons/TimerRestartButton';
import TimerIndicators from './TimerIndicators';
import TimerSettingsButton from './Buttons/TimerSettingsButton';

import classes from './TimerTop.module.css';

const TimerTop = () => {
  return (
    <div className={classes['timer-top']}>
      <TimerRestartButton />
      <TimerIndicators />
      <TimerSettingsButton />
    </div>
  );
};

export default TimerTop;
