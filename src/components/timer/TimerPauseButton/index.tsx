import { useAppDispatch } from 'store/hooks';
import { setRunning } from 'store/timerSlice';

import SvgButton from 'components/ui/SvgButton';
import { ReactComponent as SvgPause } from 'assets/svgs/pause.svg';

const TimerPauseButton = () => {
  const dispatch = useAppDispatch();

  const timerPauseButtonClickHandler = () => {
    dispatch(setRunning(false));
  };

  return (
    <SvgButton svg={<SvgPause />} clickHandler={timerPauseButtonClickHandler} />
  );
};

export default TimerPauseButton;
