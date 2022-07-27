import { ReactComponent as IconSettings } from '../../svgs/settings.svg';

import classes from './SettingsButton.module.css';

const SettingsButton = () => {
  return (
    <button className={classes['settings-btn']}>
      <IconSettings className={classes['settings-btn__icon']} />
    </button>
  );
};

export default SettingsButton;
