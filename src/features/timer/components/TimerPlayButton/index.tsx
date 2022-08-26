import { useAppDispatch } from 'hooks';

import { setRunning } from 'features/timer';

import { SvgButton } from 'components';
import { ReactComponent as SvgPlay } from 'assets/play.svg';

export const TimerPlayButton = () => {
  const dispatch = useAppDispatch();

  const timerPlayButtonClickHandler = () => {
    dispatch(setRunning(true));
  };

  return (
    <SvgButton svg={<SvgPlay />} clickHandler={timerPlayButtonClickHandler} />
  );
};
