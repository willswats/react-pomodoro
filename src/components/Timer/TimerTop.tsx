import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setPomodoroCount, setSettingsVisible } from '../../store/timerSlice';

import SvgButton from '../UI/Buttons/SvgButton';
import ModalOverlay from '../UI/ModalOverlay';
import TimerSettingsForm from './TimerSettingsForm';
import TimerIndicators from './TimerIndicators';

import { ReactComponent as SvgSettings } from '../../svgs/settings.svg';
import { ReactComponent as SvgRestart } from '../../svgs/refresh-cw.svg';

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

  const restartButtonClickHandler = () => {
    dispatch(setPomodoroCount(0));
  };

  return (
    <div className={classes['timer-top']}>
      <div className={classes['timer-top__middle']}>
        <SvgButton
          svg={<SvgRestart />}
          clickHandler={restartButtonClickHandler}
          extraButtonClassNames={classes['timer-top__restart-button']}
          extraSvgClassNames={classes['timer-top__restart-button-svg']}
        />
        <TimerIndicators />
      </div>
      <div className={classes['timer-top__end']}>
        <SvgButton
          svg={<SvgSettings />}
          clickHandler={settingsButtonClickHandler}
        />
        {timer.settingsVisible && (
          <ModalOverlay
            modal={<TimerSettingsForm />}
            clickHandler={modalOverlayClickHandler}
          />
        )}
      </div>
    </div>
  );
};

export default TimerTop;
