import { Dispatch } from 'react';

import { State, Action, ACTIONS } from '../../Timer';
import { ReactComponent as IconSettings } from '../../../svgs/settings.svg';

import classes from './SettingsButton.module.css';

interface SettingsButtonProps {
  state: State;
  dispatch: Dispatch<Action>;
}

const SettingsButton = ({ state, dispatch }: SettingsButtonProps) => {
  const clickHandler = () => {
    dispatch({
      type: ACTIONS.SET_SETTINGS_ACTIVE,
      payload: { ...state, showSettings: true },
    });
  };

  return (
    <button onClick={clickHandler} className={classes['settings-button']}>
      <IconSettings className={classes['settings-button__icon']} />
    </button>
  );
};

export default SettingsButton;
