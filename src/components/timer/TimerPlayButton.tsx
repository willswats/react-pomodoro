import { useAppDispatch } from 'store/hooks';
import { setRunning } from 'store/timerSlice';

import SvgButton from 'components/common/SvgButton';
import { ReactComponent as SvgPlay } from 'assets/svgs/play.svg';

const TimerPlayButton = () => {
  const dispatch = useAppDispatch();

  const timerPlayButtonClickHandler = () => {
    dispatch(setRunning(true));
  };

  return (
    <SvgButton svg={<SvgPlay />} clickHandler={timerPlayButtonClickHandler} />
  );
};

export default TimerPlayButton;
