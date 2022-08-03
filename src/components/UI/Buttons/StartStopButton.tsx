import classes from './StartStopButton.module.css';

interface StartStopButtonProps {
  timerRunning: boolean;
  clickHandler: () => void;
}

const StartStopButton = ({
  timerRunning,
  clickHandler,
}: StartStopButtonProps) => {
  return (
    <button className={classes['start-stop-button']} onClick={clickHandler}>
      {timerRunning === false ? 'START' : 'STOP'}
    </button>
  );
};

export default StartStopButton;
