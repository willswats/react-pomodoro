import { useAppDispatch } from 'hooks';

import {
  setMode,
  setPomodoroCount,
  setTimeRemainingToSettings,
  TIMER_MODES,
} from 'features/timer';

import SvgButton from 'components/SvgButton';
import { ReactComponent as SvgRestart } from 'assets/refresh-cw.svg';

export const TimerRestartButton = () => {
  const dispatch = useAppDispatch();

  const restartButtonClickHandler = () => {
    dispatch(setPomodoroCount(0));
    dispatch(setMode(TIMER_MODES.POMODORO));
    dispatch(setTimeRemainingToSettings());
  };

  return (
    <SvgButton svg={<SvgRestart />} clickHandler={restartButtonClickHandler} />
  );
};
