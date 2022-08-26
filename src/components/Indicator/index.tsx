import { MouseEvent } from 'react';
import styles from './styles.module.css';

interface IndicatorProps {
  id: string;
  index: number;
  completed: number;
  clickHandler: (event: MouseEvent) => void;
}

export const Indicator = ({
  id,
  index,
  completed,
  clickHandler,
}: IndicatorProps) => {
  return (
    <button
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
