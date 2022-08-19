import { useAppDispatch } from '../../../store/hooks';
import { setRunning } from '../../../store/timerSlice';

import SvgButton from '../../UI/Buttons/SvgButton';
import { ReactComponent as SvgPlay } from '../../../svgs/play.svg';

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
