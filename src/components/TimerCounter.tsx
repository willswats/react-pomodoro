import { State } from './Timer';

import convertTime from '../helpers/convertTime';

import classes from './TimerCounter.module.css';

interface TimerCounterProps {
  state: State;
}

const TimerCounter = ({ state }: TimerCounterProps) => {
  const { timeRemaining } = state;
  return (
    <div className={classes['timer-counter']}>
      <div className={classes['timer-counter__content']}>
        <p>{convertTime(timeRemaining.minutes)}</p>
        <span className={classes['timer-counter__colon']}>:</span>
        <p>{convertTime(timeRemaining.seconds)}</p>
      </div>
    </div>
  );
};

export default TimerCounter;
