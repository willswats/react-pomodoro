import { FocusEvent, ChangeEvent } from 'react';

import classes from './CounterInput.module.css';

interface CounterInputProps {
  inputValue: string;
  changeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
  blurHandler: (event: FocusEvent<HTMLInputElement>) => void;
}

const CounterInput = ({
  inputValue,
  changeHandler,
  blurHandler,
}: CounterInputProps) => {
  return (
    <input
      className={classes['counter-input']}
      value={inputValue}
      onChange={changeHandler}
      onBlur={blurHandler}
    />
  );
};

export default CounterInput;
