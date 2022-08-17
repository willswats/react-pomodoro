import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setSettingsVisible, resetToSettings } from '../../store/timerSlice';

import SvgButton from '../UI/Buttons/SvgButton';
import ModalOverlay from '../UI/ModalOverlay';
import TimerSettingsForm from './TimerSettingsForm';
import TimerIndicators from './TimerIndicators';

import { ReactComponent as SvgSettings } from '../../svgs/settings.svg';
import { ReactComponent as SvgReset } from '../../svgs/refresh-cw.svg';

import classes from './TimerTop.module.css';

const TimerTop = () => {
  const dispatch = useAppDispatch();
  const timer = useAppSelector((state) => state.timer);

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
      {timer.settingsVisible && (
        <ModalOverlay
          modal={<TimerSettingsForm />}
          clickHandler={modalOverlayClickHandler}
        />
      )}
      <TimerIndicators />
      <SvgButton
        svg={<SvgSettings />}
        clickHandler={settingsButtonClickHandler}
      />
    </div>
  );
};

export default TimerTop;
