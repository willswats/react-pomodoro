import classes from './TimeParagraph.module.css';
import convertTime from '../helpers/convertTime';

interface TimeParagraphProps {
  time: number;
}

const TimeParagraph = ({ time }: TimeParagraphProps) => {
  return <p className={classes['time-paragraph']}>{convertTime(time)}</p>;
};

export default TimeParagraph;
