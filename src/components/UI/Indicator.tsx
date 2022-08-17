import { MouseEvent } from 'react';
import classes from './Indicator.module.css';

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
      className={`${classes['indicator']} ${
        index + 1 === completed || index < completed
          ? classes['indicator--completed']
          : ''
      }`}
    />
  );
};

export default Indicator;
