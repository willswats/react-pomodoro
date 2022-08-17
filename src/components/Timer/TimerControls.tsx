import { useAppDispatch, useAppSelector } from '../../store/hooks';

import {
  setRunning,
  skipBackwards,
  skipForwards,
} from '../../store/timerSlice';

import SvgButton from '../UI/Buttons/SvgButton';

import { ReactComponent as SvgSkipBack } from '../../svgs/skip-back.svg';
import { ReactComponent as SvgSkipForward } from '../../svgs/skip-forward.svg';
import { ReactComponent as SvgPlay } from '../../svgs/play.svg';
import { ReactComponent as SvgPause } from '../../svgs/pause.svg';

import classes from './TimerControls.module.css';

const TimerControls = () => {
  const dispatch = useAppDispatch();
  const timer = useAppSelector((state) => state.timer);

  const startButtonClickHandler = () => {
    dispatch(setRunning(true));
  };

  const stopButtonClickHandler = () => {
    dispatch(setRunning(false));
  };

  const skipBackButtonClickHandler = () => {
    dispatch(skipBackwards());
  };

  const skipForwardButtonClickHandler = () => {
    dispatch(skipForwards());
  };

  return (
    <div className={classes['timer-controls']}>
      <SvgButton
        svg={<SvgSkipBack />}
        clickHandler={skipBackButtonClickHandler}
      />
      {timer.running === false ? (
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
