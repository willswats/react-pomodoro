import { Dispatch, SetStateAction, ChangeEvent } from 'react';

import classes from './SettingsInput.module.css';

interface SettingsInputProps {
  id: string;
  labelText: string;
  inputValue: number;
  setInputValue: Dispatch<SetStateAction<number>>;
}

const SettingsInput = ({
  id,
  labelText,
  inputValue,
  setInputValue,
}: SettingsInputProps) => {
  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = parseFloat(event.target.value);
    if (isNaN(inputValue)) {
      return;
    }
    setInputValue(inputValue);
  };

  return (
    <div className={classes['settings-input']}>
      <label htmlFor={id}>{labelText}</label>
      <input
        className={classes['settings-input__input']}
        id={id}
        type="number"
        value={inputValue}
        onChange={changeHandler}
      />
    </div>
  );
};

export default SettingsInput;