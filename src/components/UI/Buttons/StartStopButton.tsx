import { Dispatch } from 'react';
import { State, Action, ACTIONS } from '../../Timer';

import classes from './StartStopButton.module.css';

interface StartStopButtonProps {
  state: State;
  dispatch: Dispatch<Action>;
}

const StartStopButton = ({ state, dispatch }: StartStopButtonProps) => {
  const { running } = state;
  const { pomodoro, shortBreak, longBreak } = state.counters;

  const clickHandler = () => {
    if (
      (pomodoro.minutes === 0 && pomodoro.seconds === 0) ||
      (shortBreak.minutes === 0 && shortBreak.seconds === 0) ||
      (longBreak.minutes === 0 && longBreak.seconds === 0)
    ) {
      return;
    }

    dispatch({
      type: ACTIONS.SET_RUNNING,
      payload: { ...state, running: !running },
    });
  };

  return (
    <button className={classes['start-stop-button']} onClick={clickHandler}>
      {running === false ? 'START' : 'STOP'}
    </button>
  );
};

export default StartStopButton;
