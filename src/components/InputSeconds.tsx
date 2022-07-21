import { ChangeEvent } from 'react';

import classes from './InputSeconds.module.css';

interface InputSecondsProps {
  seconds: number;
  changeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
}

const InputSeconds = ({ seconds, changeHandler }: InputSecondsProps) => {
  return (
    <input
      className={classes['input-seconds']}
      value={seconds}
      onChange={changeHandler}
      type="number"
    ></input>
  );
};

export default InputSeconds;
