import { MouseEvent } from 'react';

import SvgCheck from 'assets/check-line.svg?react';

import styles from './styles.module.css';

interface SettingsButtonCheckProps {
  id: string;
  labelText: string;
  checked: boolean;
  clickHandler: (event: MouseEvent) => void;
}

export const SettingsButtonCheck = ({
  id,
  labelText,
  checked,
  clickHandler,
}: SettingsButtonCheckProps) => {
  return (
    <div className={styles['settings-button-check']}>
      <label className={styles['settings-button-check__label']} htmlFor={id}>
        {labelText}
      </label>
      <div className={styles['settings-button-check__button-container']}>
        <button
          onClick={clickHandler}
          className={styles['settings-button-check__button']}
        >
          {checked ? <SvgCheck /> : ''}
        </button>
      </div>
    </div>
  );
};
