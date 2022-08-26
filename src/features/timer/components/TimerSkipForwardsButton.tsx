import { useAppDispatch } from 'hooks';

import { setPomodoroCountForwards } from 'features/timer';

import SvgButton from 'components/SvgButton';
import { ReactComponent as SvgSkipForwards } from 'assets/skip-forward.svg';

export const TimerSkipForwardsButton = () => {
  const dispatch = useAppDispatch();

  const timerSkipForwardsButtonClickHandler = () => {
    dispatch(setPomodoroCountForwards());
  };

  return (
    <SvgButton
      svg={<SvgSkipForwards />}
      clickHandler={timerSkipForwardsButtonClickHandler}
    />
  );
};
