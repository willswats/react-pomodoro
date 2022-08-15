import { useAppDispatch, useAppSelector } from '../../store/hooks';

import {
  setRunning,
  setPomodoroCountForward,
  setPomodoroCountBack,
} from '../../store/timerSlice';

import SvgButton from '../UI/Buttons/SvgButton';

import { ReactComponent as SvgSkipBack } from '../../svgs/skip-back.svg';
import { ReactComponent as SvgSkipForward } from '../../svgs/skip-forward.svg';
import { ReactComponent as SvgPlay } from '../../svgs/play.svg';
import { ReactComponent as SvgPause } from '../../svgs/pause.svg';

import classes from './TimerControls.module.css';

const TimerControls = () => {
  const dispatch = useAppDispatch();
  const running = useAppSelector((state) => state.timer.running);

  const startButtonClickHandler = () => {
    dispatch(setRunning(true));
  };

  const stopButtonClickHandler = () => {
    dispatch(setRunning(false));
  };

  const skipBackButtonClickHandler = () => {
    dispatch(setPomodoroCountBack());
  };

  const skipForwardButtonClickHandler = () => {
    dispatch(setPomodoroCountForward());
  };

  return (
    <div className={classes['timer-controls']}>
      <SvgButton
        svg={<SvgSkipBack />}
        clickHandler={skipBackButtonClickHandler}
      />
      {running === false ? (
        <SvgButton svg={<SvgPlay />} clickHandler={startButtonClickHandler} />
      ) : (
        <SvgButton svg={<SvgPause />} clickHandler={stopButtonClickHandler} />
      )}
      <SvgButton
        svg={<SvgSkipForward />}
        clickHandler={skipForwardButtonClickHandler}
      />
    </div>
  );
};

export default TimerControls;
