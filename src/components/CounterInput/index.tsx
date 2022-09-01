import { FocusEvent, ChangeEvent } from 'react';

import styles from './styles.module.css';

interface CounterInputProps {
  id: string;
  inputMin: string;
  inputMax: string;
  inputValue: string;
  changeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
  blurHandler: (event: FocusEvent<HTMLInputElement>) => void;
}

export const CounterInput = ({
  id,
  inputMin,
  inputMax,
  inputValue,
  changeHandler,
  blurHandler,
}: CounterInputProps) => {
  return (
    <input
      type="number"
      min={inputMin}
      max={inputMax}
      id={id}
      className={styles['counter-input']}
      value={inputValue}
      onChange={changeHandler}
      onBlur={blurHandler}
    />
  );
};
