import { ChangeEvent, Dispatch } from 'react';
import { State, Action, ACTIONS } from '../Timer';

import classes from './SecondsInput.module.css';

interface SecondsInputProps {
  state: State;
  dispatch: Dispatch<Action>;
}

const SecondsInput = ({ state, dispatch }: SecondsInputProps) => {
  const { timerRunning, timeRemaining } = state;

  const blurHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (isNaN(parseFloat(event.target.value))) {
      dispatch({
        type: ACTIONS.SET_TIME_REMAINING,
        payload: {
          ...state,
          timeRemaining: { ...timeRemaining, seconds: 0 },
        },
      });
    }
  };

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const inputVal = parseFloat(event.target.value);
    if (timerRunning) {
      dispatch({
        type: ACTIONS.SET_TIMER_RUNNING,
        payload: { ...state, timerRunning: false },
      });
    }
    dispatch({
      type: ACTIONS.SET_TIME_REMAINING,
      payload: {
        ...state,
        timeRemaining: { ...timeRemaining, seconds: inputVal },
      },
    });
  };

  return (
    <input
      className={classes['seconds-input']}
      value={timeRemaining.seconds}
      onBlur={blurHandler}
      onChange={changeHandler}
      type="number"
    ></input>
  );
};

export default SecondsInput;
