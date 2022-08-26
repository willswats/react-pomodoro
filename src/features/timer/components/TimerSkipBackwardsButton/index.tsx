import { useAppDispatch } from 'hooks';

import { setPomodoroCountBackwards } from 'features/timer';

import { SvgButton } from 'components';
import { ReactComponent as SvgSkipBackwards } from 'assets/skip-back.svg';

export const TimerSkipBackwardsButton = () => {
  const dispatch = useAppDispatch();

  const timerSkipBackwardsButtonClickHandler = () => {
    dispatch(setPomodoroCountBackwards());
  };

  return (
    <SvgButton
      svg={<SvgSkipBackwards />}
      clickHandler={timerSkipBackwardsButtonClickHandler}
    />
  );
};
