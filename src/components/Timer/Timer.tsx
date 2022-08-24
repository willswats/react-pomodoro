import TimerTop from './TimerTop';
import TimerMiddle from './TimerMiddle';
import TimerBottom from './TimerBottom';
import TimerSettingsForm from './TimerSettingsForm';

import { useAppSelector } from '../../store/hooks';

import classes from './Timer.module.css';

const Timer = () => {
  const timer = useAppSelector((state) => state.timer);

  return (
    <div className={classes['timer']}>
      <div className={classes['timer__content']}>
        {!timer.settingsVisible ? (
          <>
            <TimerTop />
            <TimerMiddle />
            <TimerBottom />
          </>
        ) : (
          <TimerSettingsForm />
        )}
      </div>
    </div>
  );
};

export default Timer;
