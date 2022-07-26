import classes from './TimeParagraph.module.css';

interface TimeParagraphProps {
  time: number;
}

const TimeParagraph = ({ time }: TimeParagraphProps) => {
  return <p className={classes['time-paragraph']}>{time}</p>;
};

export default TimeParagraph;
