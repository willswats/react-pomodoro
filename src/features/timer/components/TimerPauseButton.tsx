import { useAppDispatch } from 'hooks';

import { setRunning } from 'features/timer';

import SvgButton from 'components/SvgButton';
import { ReactComponent as SvgPause } from 'assets/pause.svg';

export const TimerPauseButton = () => {
  const dispatch = useAppDispatch();

  const timerPauseButtonClickHandler = () => {
    dispatch(setRunning(false));
  };

  return (
    <SvgButton svg={<SvgPause />} clickHandler={timerPauseButtonClickHandler} />
  );
};
