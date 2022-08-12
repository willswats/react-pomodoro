import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

import {
  setTimeRemaining,
  setTimeRemainingToSettings,
} from '../../store/timerSlice';

import convertTime from '../../helpers/convertTime';

import classes from './TimerCounter.module.css';

const TimerCounter = () => {
  const dispatch = useAppDispatch();

  const mode = useAppSelector((state) => state.timer.mode);
  const running = useAppSelector((state) => state.timer.running);
  const minutes = useAppSelector((state) => state.timer.timeRemaining.minutes);
  const seconds = useAppSelector((state) => state.timer.timeRemaining.seconds);
  const settingsChanged = useAppSelector(
    (state) => state.timer.settingsChanged
  );

  useEffect(() => {
    // Change time when settings is changed
    if (running !== true && settingsChanged === true) {
      dispatch(setTimeRemainingToSettings());
    }

    // Timer logic
    const intervalId = setInterval(() => {
      if (seconds === 0) {
        dispatch(setTimeRemaining({ minutes: minutes - 1, seconds: 59 }));
      } else {
        dispatch(setTimeRemaining({ minutes: minutes, seconds: seconds - 1 }));
      }
    }, 1000);

    if (running === false) {
      clearInterval(intervalId);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [dispatch, minutes, seconds, mode, running, settingsChanged]);

  return (
    <div className={classes['counter']}>
      <div className={classes['counter__content']}>
        <p>{convertTime(minutes)}</p>
        <span className={classes['counter__colon']}>:</span>
        <p>{convertTime(seconds)}</p>
      </div>
    </div>
  );
};

export default TimerCounter;
