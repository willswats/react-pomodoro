import { ChangeEvent } from 'react';

import styles from './styles.module.css';

interface SettingsInputProps {
  id: string;
  labelText: string;
  inputValue: string;
  changeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const SettingsInput = ({
  id,
  labelText,
  inputValue,
  changeHandler,
}: SettingsInputProps) => {
  return (
    <div className={styles['settings-input']}>
      <label className={styles['settings-input__label']} htmlFor={id}>
        {labelText}
      </label>
      <input
        className={styles['settings-input__input']}
        id={id}
        value={inputValue}
        onChange={changeHandler}
      />
    </div>
  );
};
