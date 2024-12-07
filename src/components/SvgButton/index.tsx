import { MouseEvent, JSX } from 'react';

import styles from './styles.module.css';

interface SvgButtonProps {
  svg: JSX.Element;
  clickHandler?: (event: MouseEvent) => void;
}

export const SvgButton = ({ svg, clickHandler }: SvgButtonProps) => {
  return (
    <button onClick={clickHandler} className={styles['svg-button']}>
      <span className={styles['svg-button__svg']}>{svg}</span>
    </button>
  );
};
