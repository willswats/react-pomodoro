import { ChangeEvent } from 'react';

import classes from './InputMinutes.module.css';

interface InputMinutesProps {
  minutes: number;
  changeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
}

const InputMinutes = ({ minutes, changeHandler }: InputMinutesProps) => {
  return (
    <input
      className={classes['input-minutes']}
      value={minutes}
      onChange={changeHandler}
      type="number"
    ></input>
  );
};

export default InputMinutes;
