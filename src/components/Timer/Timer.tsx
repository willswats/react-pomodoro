import { useAppSelector } from '../../store/hooks';

import TimerTop from './TimerTop';
import TimerModeButtons from './TimerModeButtons';
import TimerCounter from './TimerCounter';
import TimerBottom from './TimerBottom';

import classes from './Timer.module.css';

const Timer = () => {
  const state = useAppSelector((state) => state);

  console.log(state);

  return (
    <div className={classes['timer']}>
      <div className={classes['timer__content']}>
        <TimerTop />
        <TimerModeButtons />
        <TimerCounter />
        <TimerBottom />
      </div>
    </div>
  );
};

export default Timer;
