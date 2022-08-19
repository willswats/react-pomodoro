import { useAppDispatch } from '../../../store/hooks';
import { skipForwards } from '../../../store/timerSlice';

import SvgButton from '../../UI/Buttons/SvgButton';
import { ReactComponent as SvgSkipForwards } from '../../../svgs/skip-forward.svg';

import classes from './TimerSkipForwardsButton.module.css';

const TimerSkipForwardsButton = () => {
  const dispatch = useAppDispatch();

  const timerSkipForwardsButtonClickHandler = () => {
    dispatch(skipForwards());
  };

  return (
    <SvgButton
      svg={<SvgSkipForwards />}
      clickHandler={timerSkipForwardsButtonClickHandler}
      extraButtonClassNames={classes['timer-skip-forwards-button']}
    />
  );
};
export default TimerSkipForwardsButton;
