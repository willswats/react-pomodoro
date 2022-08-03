import { Dispatch } from 'react';
import { State, Action, ACTIONS } from '../../Timer';

import classes from './StartStopButton.module.css';

interface StartStopButtonProps {
  state: State;
  dispatch: Dispatch<Action>;
}

const StartStopButton = ({ state, dispatch }: StartStopButtonProps) => {
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
    <button className={classes['start-stop-button']} onClick={clickHandler}>
      {timerRunning === false ? 'START' : 'STOP'}
    </button>
  );
};

export default StartStopButton;
