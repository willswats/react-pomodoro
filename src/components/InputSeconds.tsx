import { ChangeEvent, Dispatch } from 'react';
import { State, Action, ACTIONS } from './Timer';

import classes from './InputSeconds.module.css';

interface InputSecondsProps {
  state: State;
  dispatch: Dispatch<Action>;
}

const InputSeconds = ({ state, dispatch }: InputSecondsProps) => {
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
      className={classes['input-seconds']}
      value={timeRemaining.seconds}
      onBlur={blurHandler}
      onChange={changeHandler}
      type="number"
    ></input>
  );
};

export default InputSeconds;
