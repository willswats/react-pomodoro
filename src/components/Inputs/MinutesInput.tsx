import { ChangeEvent, Dispatch } from 'react';
import { State, Action, ACTIONS } from '../Timer';

import classes from './MinutesInput.module.css';

interface MinutesInputProps {
  state: State;
  dispatch: Dispatch<Action>;
}

const MinutesInput = ({ state, dispatch }: MinutesInputProps) => {
  const { timerRunning, timeRemaining } = state;

  const blurHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (isNaN(parseFloat(event.target.value))) {
      dispatch({
        type: ACTIONS.SET_TIME_REMAINING,
        payload: {
          ...state,
          timeRemaining: { ...timeRemaining, minutes: 0 },
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
        timeRemaining: { ...timeRemaining, minutes: inputVal },
      },
    });
  };

  return (
    <input
      className={classes['minutes-input']}
      value={timeRemaining.minutes}
      onBlur={blurHandler}
      onChange={changeHandler}
      type="number"
    ></input>
  );
};

export default MinutesInput;
