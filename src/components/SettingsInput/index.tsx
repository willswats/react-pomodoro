import { ChangeEvent } from 'react';

import styles from './styles.module.css';

interface SettingsInputProps {
  id: string;
  labelText: string;
  inputMin: string;
  inputMax: string;
  inputValue: string;
  changeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
  errorText: string;
}

export const SettingsInput = ({
  id,
  labelText,
  inputMin,
  inputMax,
  inputValue,
  changeHandler,
  errorText,
}: SettingsInputProps) => {
  return (
    <div className={styles['settings-input']}>
      <label className={styles['settings-input__label']} htmlFor={id}>
        {labelText}
      </label>
      <input
        type="number"
        min={inputMin}
        max={inputMax}
        className={`${styles['settings-input__input']} ${
          errorText.length > 0 ? styles['settings-input__input-error'] : ''
        }`}
        id={id}
        value={inputValue}
        onChange={changeHandler}
      />
      <p className={styles['settings-input__error-text']}>{errorText}</p>
    </div>
  );
};
