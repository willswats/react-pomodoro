import { Dispatch } from 'react';
import { State, Action, ACTIONS } from './Timer';

import classes from './ButtonStartStop.module.css';

interface ButtonStartStopProps {
  state: State;
  dispatch: Dispatch<Action>;
}

const ButtonStartStop = ({ state, dispatch }: ButtonStartStopProps) => {
  const clickHandler = () => {
    dispatch({
      type: ACTIONS.SET_RUNNING,
      payload: { ...state, running: !state.running },
    });
  };

  return (
    <button className={classes['button-start-stop']} onClick={clickHandler}>
      {state.running === false ? 'START' : 'STOP'}
    </button>
  );
};

export default ButtonStartStop;
