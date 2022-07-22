import { ChangeEvent, Dispatch } from 'react';
import { State, Action, ACTIONS } from './Timer';

import classes from './InputSeconds.module.css';

interface InputSecondsProps {
  state: State;
  dispatch: Dispatch<Action>;
}

const InputSeconds = ({ state, dispatch }: InputSecondsProps) => {
  const blurHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (isNaN(parseFloat(event.target.value))) {
      dispatch({
        type: ACTIONS.SET_SECONDS,
        payload: { ...state, seconds: 0 },
      });
    }
  };

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const inputVal = parseFloat(event.target.value);
    if (state.running) {
      dispatch({
        type: ACTIONS.SET_RUNNING,
        payload: { ...state, running: false },
      });
    }
    dispatch({
      type: ACTIONS.SET_SECONDS,
      payload: { ...state, seconds: inputVal },
    });
  };

  return (
    <input
      className={classes['input-seconds']}
      value={state.seconds}
      onBlur={blurHandler}
      onChange={changeHandler}
      type="number"
    ></input>
  );
};

export default InputSeconds;
