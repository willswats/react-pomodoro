import { MouseEvent } from 'react';
import styles from './styles.module.css';

interface IndicatorProps {
  id: string;
  index: number;
  completed: number;
  clickHandler: (event: MouseEvent) => void;
}

const Indicator = ({ id, index, completed, clickHandler }: IndicatorProps) => {
  return (
    <span
      onClick={clickHandler}
      key={id}
      className={`${styles['indicator']} ${
        index + 1 === completed || index < completed
          ? styles['indicator--completed']
          : ''
      }`}
    />
  );
};

export default Indicator;
