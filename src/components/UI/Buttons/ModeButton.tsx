import classes from './ModeButton.module.css';

interface ModeButtonProps {
  text: string;
  buttonMode: string;
  timerMode: string;
  clickHandler: () => void;
}

const ModeButton = ({
  text,
  buttonMode,
  timerMode,
  clickHandler,
}: ModeButtonProps) => {
  return (
    <button
      onClick={clickHandler}
      className={`${classes['mode-button']} ${
        timerMode === buttonMode ? classes['mode-button--active'] : ''
      }`}
    >
      {text}
    </button>
  );
};

export default ModeButton;
