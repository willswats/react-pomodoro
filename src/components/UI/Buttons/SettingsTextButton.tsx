import { FormEvent } from 'react';

import classes from './SettingsTextButton.module.css';

interface SettingsTextButtonProps {
  text: string;
  clickHandler?: (event: FormEvent) => void;
}

const SettingsTextButton = ({
  text,
  clickHandler,
}: SettingsTextButtonProps) => {
  return (
    <button onClick={clickHandler} className={classes['settings-text-button']}>
      {text}
    </button>
  );
};

export default SettingsTextButton;
