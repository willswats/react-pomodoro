import { MouseEvent } from 'react';

import { ReactComponent as SvgCheck } from 'assets/check.svg';

import styles from './styles.module.css';

interface SettingsCheckProps {
  id: string;
  labelText: string;
  checked: boolean;
  clickHandler: (event: MouseEvent) => void;
}

export const SettingsCheck = ({
  id,
  labelText,
  checked,
  clickHandler,
}: SettingsCheckProps) => {
  return (
    <div className={styles['settings-input-check']}>
      <label className={styles['settings-input-check__label']} htmlFor={id}>
        {labelText}
      </label>
      <button
        onClick={clickHandler}
        className={styles['settings-input-check__button']}
      >
        {checked ? <SvgCheck /> : ''}
      </button>
    </div>
  );
};
