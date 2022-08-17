import { ChangeEvent } from 'react';

import classes from './SettingsInput.module.css';

interface SettingsInputProps {
  id: string;
  labelText: string;
  inputValue: string;
  changeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
}

const SettingsInput = ({
  id,
  labelText,
  inputValue,
  changeHandler,
}: SettingsInputProps) => {
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
