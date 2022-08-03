import { ReactComponent as IconSettings } from '../../../svgs/settings.svg';

import classes from './SettingsButton.module.css';

interface SettingsButtonProps {
  clickHandler: () => void;
}

const SettingsButton = ({ clickHandler }: SettingsButtonProps) => {
  return (
    <button onClick={clickHandler} className={classes['settings-button']}>
      <IconSettings className={classes['settings-button__icon']} />
    </button>
  );
};

export default SettingsButton;
