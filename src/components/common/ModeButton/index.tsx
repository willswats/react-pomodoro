import styles from './styles.module.css';

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
      className={`${styles['mode-button']} ${
        timerMode === buttonMode ? styles['mode-button--active'] : ''
      }`}
    >
      {text}
    </button>
  );
};

export default ModeButton;
