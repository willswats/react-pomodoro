import { useAppDispatch } from '../../../store/hooks';
import {
  setMode,
  setPomodoroCount,
  setTimeRemainingToSettings,
  TIMER_MODES,
} from '../../../store/timerSlice';

import SvgButton from '../../UI/Buttons/SvgButton';
import { ReactComponent as SvgRestart } from '../../../svgs/refresh-cw.svg';

const RestartButton = () => {
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

export default RestartButton;