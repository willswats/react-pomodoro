import { ChangeEvent, Dispatch } from 'react';
import { State, Action, ACTIONS } from './Timer';

import classes from './InputMinutes.module.css';

interface InputMinutesProps {
  state: State;
  dispatch: Dispatch<Action>;
}

const InputMinutes = ({ state, dispatch }: InputMinutesProps) => {
  const blurHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (isNaN(parseFloat(event.target.value))) {
      dispatch({
        type: ACTIONS.SET_MINUTES,
        payload: { ...state, minutes: 0 },
      });
    }
  };

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const inputVal = parseFloat(event.target.value);
    if (state.running) {
      dispatch({
        type: ACTIONS.SET_MINUTES,
        payload: { ...state, running: false },
      });
    }
    dispatch({
      type: ACTIONS.SET_MINUTES,
      payload: { ...state, minutes: inputVal },
    });
  };

  return (
    <input
      className={classes['input-minutes']}
      value={state.minutes}
      onBlur={blurHandler}
      onChange={changeHandler}
      type="number"
    ></input>
  );
};

export default InputMinutes;
