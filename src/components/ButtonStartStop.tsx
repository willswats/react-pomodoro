import { Dispatch } from 'react';
import { State, Action, ACTIONS } from './Timer';

import classes from './ButtonStartStop.module.css';

interface ButtonStartStopProps {
  state: State;
  dispatch: Dispatch<Action>;
}

const ButtonStartStop = ({ state, dispatch }: ButtonStartStopProps) => {
  const { timerRunning, timeRemaining } = state;

  const clickHandler = () => {
    if (timeRemaining.minutes === 0 && timeRemaining.seconds === 0) {
      return;
    }
    dispatch({
      type: ACTIONS.SET_TIMER_RUNNING,
      payload: { ...state, timerRunning: !timerRunning },
    });
  };

  return (
    <button className={classes['button-start-stop']} onClick={clickHandler}>
      {timerRunning === false ? 'START' : 'STOP'}
    </button>
  );
};

export default ButtonStartStop;
