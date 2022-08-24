import { useAppDispatch } from '../../../store/hooks';
import { skipBackwards } from '../../../store/timerSlice';

import SvgButton from '../../UI/Buttons/SvgButton';
import { ReactComponent as SvgSkipBackwards } from '../../../svgs/skip-back.svg';

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
