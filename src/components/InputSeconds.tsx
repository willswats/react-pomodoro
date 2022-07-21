import { ChangeEvent } from 'react';

import classes from './InputSeconds.module.css';

interface InputSecondsProps {
  seconds: number;
  blurHandler: (event: ChangeEvent<HTMLInputElement>) => void;
  changeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
}

const InputSeconds = ({
  seconds,
  blurHandler,
  changeHandler,
}: InputSecondsProps) => {
  return (
    <input
      className={classes['input-seconds']}
      value={seconds}
      onBlur={blurHandler}
      onChange={changeHandler}
      type="number"
    ></input>
  );
};

export default InputSeconds;
