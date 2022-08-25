import { FocusEvent, ChangeEvent } from 'react';

import styles from './styles.module.css';

interface CounterInputProps {
  id: string;
  inputValue: string;
  changeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
  blurHandler: (event: FocusEvent<HTMLInputElement>) => void;
}

const CounterInput = ({
  id,
  inputValue,
  changeHandler,
  blurHandler,
}: CounterInputProps) => {
  return (
    <input
      id={id}
      className={styles['counter-input']}
      value={inputValue}
      onChange={changeHandler}
      onBlur={blurHandler}
    />
  );
};

export default CounterInput;
