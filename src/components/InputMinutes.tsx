import { ChangeEvent } from 'react';

import classes from './InputMinutes.module.css';

interface InputMinutesProps {
  minutes: number;
  blurHandler: (event: ChangeEvent<HTMLInputElement>) => void;
  changeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
}

const InputMinutes = ({
  minutes,
  blurHandler,
  changeHandler,
}: InputMinutesProps) => {
  return (
    <input
      className={classes['input-minutes']}
      value={minutes}
      onBlur={blurHandler}
      onChange={changeHandler}
      type="number"
    ></input>
  );
};

export default InputMinutes;
