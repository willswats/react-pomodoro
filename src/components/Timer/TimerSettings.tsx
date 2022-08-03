import { Dispatch } from 'react';
import { Action, State, ACTIONS } from './Timer';

import SettingsButton from '../UI/Buttons/SettingsButton';
import ModalOverlay from '../UI/ModalOverlay';
import TimerSettingsForm from './TimerSettingsForm';

import classes from './TimerSettings.module.css';

interface TimerSettingsProps {
  state: State;
  dispatch: Dispatch<Action>;
}

const TimerSettings = ({ state, dispatch }: TimerSettingsProps) => {
  const { timerSettingsVisible } = state;

  const settingsButtonClickHandler = () => {
    dispatch({
      type: ACTIONS.SET_TIMER_SETTINGS_VISIBLE,
      payload: { ...state, timerSettingsVisible: true },
    });
  };

  const modalOverlayClickHandler = () => {
    dispatch({
      type: ACTIONS.SET_TIMER_SETTINGS_VISIBLE,
      payload: { ...state, timerSettingsVisible: false },
    });
  };

  return (
    <div className={classes['timer-settings']}>
      <SettingsButton clickHandler={settingsButtonClickHandler} />
      {timerSettingsVisible && (
        <ModalOverlay
          modal={<TimerSettingsForm />}
          clickHandler={modalOverlayClickHandler}
        />
      )}
    </div>
  );
};

export default TimerSettings;
