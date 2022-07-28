import { Dispatch } from 'react';
import { createPortal } from 'react-dom';

import { State, Action, ACTIONS } from '../Timer';

import classes from './SettingsOverlay.module.css';

interface SettingsOverlayProps {
  state: State;
  dispatch: Dispatch<Action>;
  settingsElement: JSX.Element;
}

const modalRoot = document.getElementById('modal-root') as HTMLElement;

const SettingsOverlay = ({
  state,
  dispatch,
  settingsElement,
}: SettingsOverlayProps) => {
  const settingsOverlayClickHandler = () => {
    dispatch({
      type: ACTIONS.SET_SETTINGS_ACTIVE,
      payload: { ...state, showSettings: false },
    });
  };

  return createPortal(
    <>
      <div
        onClick={settingsOverlayClickHandler}
        className={classes['settings-overlay']}
      />
      <div className={classes['settings-element-container']}>
        {settingsElement}
      </div>
    </>,
    modalRoot
  );
};

export default SettingsOverlay;
