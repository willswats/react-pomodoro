import { ChangeEvent } from 'react';

import styles from './styles.module.css';

interface SettingsInputRangeProps {
  id: string;
  labelText: string;
  inputMin: string;
  inputMax: string;
  inputStep: string;
  inputValue: number;
  changeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const SettingsInputRange = ({
  id,
  labelText,
  inputMin,
  inputMax,
  inputStep,
  inputValue,
  changeHandler,
}: SettingsInputRangeProps) => {
  return (
    <div className={styles['settings-input-range']}>
      <label className={styles['settings-input-range__label']} htmlFor={id}>
        {labelText}
      </label>
      <input
        type="range"
        min={inputMin}
        max={inputMax}
        step={inputStep}
        className={styles['settings-input-range__input']}
        id={id}
        value={inputValue}
        onChange={changeHandler}
      />
    </div>
  );
};
