import { useAppDispatch } from 'hooks';
import { skipBackwards } from 'store/timerSlice';

import SvgButton from 'components/ui/SvgButton';
import { ReactComponent as SvgSkipBackwards } from 'assets/svgs/skip-back.svg';

const TimerSkipBackwardsButton = () => {
  const dispatch = useAppDispatch();

  const timerSkipBackwardsButtonClickHandler = () => {
    dispatch(skipBackwards());
  };

  return (
    <SvgButton
      svg={<SvgSkipBackwards />}
      clickHandler={timerSkipBackwardsButtonClickHandler}
    />
  );
};

export default TimerSkipBackwardsButton;
