import { Dispatch } from 'react';

import { State, Action, ACTIONS } from '../../Timer';
import { ReactComponent as IconSettings } from '../../../svgs/settings.svg';

import classes from './ShowSettingsButton.module.css';

interface ShowSettingsButtonProps {
  state: State;
  dispatch: Dispatch<Action>;
}

const ShowSettingsButton = ({ state, dispatch }: ShowSettingsButtonProps) => {
  const clickHandler = () => {
    dispatch({
      type: ACTIONS.SET_SETTINGS_VISIBLE,
      payload: { ...state, settingsVisible: true },
    });
  };

  return (
    <button onClick={clickHandler} className={classes['show-settings-button']}>
      <IconSettings className={classes['show-settings-button__icon']} />
    </button>
  );
};

export default ShowSettingsButton;
