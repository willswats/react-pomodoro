import { ReactComponent as IconSettings } from '../../../svgs/settings.svg';

import classes from './SettingsButton.module.css';

const SettingsButton = () => {
  return (
    <button className={classes['settings-btn']}>
      <IconSettings />
    </button>
  );
};

export default SettingsButton;
