import { ChangeEvent } from 'react';

import styles from './styles.module.css';

interface SettingsInputNumberProps {
  id: string;
  labelText: string;
  inputMin: string;
  inputMax: string;
  inputValue: string;
  changeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
  errorText: string;
}

export const SettingsInputNumber = ({
  id,
  labelText,
  inputMin,
  inputMax,
  inputValue,
  changeHandler,
  errorText,
}: SettingsInputNumberProps) => {
  return (
    <div className={styles['settings-input-number']}>
      <label className={styles['settings-input-number__label']} htmlFor={id}>
        {labelText}
      </label>
      <input
        type="number"
        min={inputMin}
        max={inputMax}
        className={`${styles['settings-input-number__input']} ${
          errorText.length > 0
            ? styles['settings-input-number__input-error']
            : ''
        }`}
        id={id}
        value={inputValue}
        onChange={changeHandler}
      />
      <p className={styles['settings-input-number__error-text']}>{errorText}</p>
    </div>
  );
};
