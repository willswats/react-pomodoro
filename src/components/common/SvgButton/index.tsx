import { MouseEvent } from 'react';

import styles from './styles.module.css';

interface SvgButtonProps {
  svg: JSX.Element;
  clickHandler?: (event: MouseEvent) => void;
}

const SvgButton = ({ svg, clickHandler }: SvgButtonProps) => {
  return (
    <button onClick={clickHandler} className={styles['svg-button']}>
      <span className={styles['svg-button__svg']}>{svg}</span>
    </button>
  );
};

export default SvgButton;
