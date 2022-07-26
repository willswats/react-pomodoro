import { State } from './Timer';

import convertTime from '../helpers/convertTime';

import classes from './TimerCount.module.css';

interface TimerCountProps {
  state: State;
}

const TimerCount = ({ state }: TimerCountProps) => {
  const { timeRemaining } = state;
  return (
    <div className={classes['timer-count']}>
      <p>{convertTime(timeRemaining.minutes)}</p>
      <span className={classes['timer-count__colon']}>:</span>
      <p>{convertTime(timeRemaining.seconds)}</p>
    </div>
  );
};

export default TimerCount;
