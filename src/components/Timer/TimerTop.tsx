import { useAppDispatch, useAppSelector } from '../../store/hooks';

import {
  setSettingsVisible,
  setPomodoroCount,
  setMode,
  TIMER_MODES,
} from '../../store/timerSlice';

import SvgButton from '../UI/Buttons/SvgButton';
import ModalOverlay from '../UI/ModalOverlay';
import Indicator from '../UI/Indicator';
import TimerSettingsForm from './TimerSettingsForm';

import { ReactComponent as SvgSettings } from '../../svgs/settings.svg';
import { ReactComponent as SvgRestart } from '../../svgs/refresh.svg';

import classes from './TimerTop.module.css';

const TimerTop = () => {
  const dispatch = useAppDispatch();

  const settingsVisible = useAppSelector(
    (state) => state.timer.settingsVisible
  );
  const pomodoroCount = useAppSelector((state) => state.timer.pomodoroCount);
  const longBreakInterval = useAppSelector(
    (state) => state.timer.settings.longBreakInterval
  );

  const settingsButtonClickHandler = () => {
    dispatch(setSettingsVisible(true));
  };

  const modalOverlayClickHandler = () => {
    dispatch(setSettingsVisible(false));
  };

  const restartButtonClickHandler = () => {
    dispatch(setPomodoroCount(0));
    dispatch(setMode(TIMER_MODES.POMODORO));
  };

  return (
    <div className={classes['timer-top']}>
      <SvgButton
        svg={<SvgRestart />}
        clickHandler={restartButtonClickHandler}
      />
      {settingsVisible && (
        <ModalOverlay
          modal={<TimerSettingsForm />}
          clickHandler={modalOverlayClickHandler}
        />
      )}
      <Indicator completed={pomodoroCount} total={longBreakInterval} />
      <SvgButton
        svg={<SvgSettings />}
        clickHandler={settingsButtonClickHandler}
      />
    </div>
  );
};

export default TimerTop;
