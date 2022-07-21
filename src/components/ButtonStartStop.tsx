import classes from './ButtonStartStop.module.css';

interface ButtonStartStopProps {
  timerRunning: Boolean;
  clickHandler: () => void;
}

const ButtonStartStop = ({
  timerRunning,
  clickHandler,
}: ButtonStartStopProps) => {
  return (
    <button className={classes['button-start-stop']} onClick={clickHandler}>
      {timerRunning === false ? 'START' : 'STOP'}
    </button>
  );
};

export default ButtonStartStop;
