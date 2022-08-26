import { useAppDispatch } from 'hooks';
import { skipForwards } from 'store/timerSlice';

import SvgButton from 'components/ui/SvgButton';
import { ReactComponent as SvgSkipForwards } from 'assets/svgs/skip-forward.svg';

const TimerSkipForwardsButton = () => {
  const dispatch = useAppDispatch();

  const timerSkipForwardsButtonClickHandler = () => {
    dispatch(skipForwards());
  };

  return (
    <SvgButton
      svg={<SvgSkipForwards />}
      clickHandler={timerSkipForwardsButtonClickHandler}
    />
  );
};
export default TimerSkipForwardsButton;
