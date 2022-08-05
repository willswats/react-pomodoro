import { Dispatch } from 'react';
import { Action, State, ACTIONS } from './Timer';

import SvgButton from '../UI/Buttons/SvgButton';
import ModalOverlay from '../UI/ModalOverlay';
import TimerSettingsForm from './TimerSettingsForm';

import { ReactComponent as SvgSettings } from '../../svgs/settings.svg';
import { ReactComponent as SvgRestart } from '../../svgs/refresh-cw.svg';

import classes from './TimerTop.module.css';

interface TimerTopProps {
  state: State;
  dispatch: Dispatch<Action>;
}

const TimerTop = ({ state, dispatch }: TimerTopProps) => {
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

  const restartButtonClickHandler = () => {};

  return (
    <div className={classes['timer-top']}>
      <SvgButton
        svg={<SvgRestart />}
        clickHandler={restartButtonClickHandler}
      />
      {timerSettingsVisible && (
        <ModalOverlay
          modal={<TimerSettingsForm state={state} dispatch={dispatch} />}
          clickHandler={modalOverlayClickHandler}
        />
      )}

      <SvgButton
        svg={<SvgSettings />}
        clickHandler={settingsButtonClickHandler}
      />
    </div>
  );
};

export default TimerTop;
