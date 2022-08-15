import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setSettingsVisible, resetToSettings } from '../../store/timerSlice';

import SvgButton from '../UI/Buttons/SvgButton';
import ModalOverlay from '../UI/ModalOverlay';
import Indicator from '../UI/Indicator';
import TimerSettingsForm from './TimerSettingsForm';

import { ReactComponent as SvgSettings } from '../../svgs/settings.svg';
import { ReactComponent as SvgReset } from '../../svgs/refresh-cw.svg';

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

  const resetButtonClickHandler = () => {
    dispatch(resetToSettings());
  };

  return (
    <div className={classes['timer-top']}>
      <SvgButton svg={<SvgReset />} clickHandler={resetButtonClickHandler} />
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
