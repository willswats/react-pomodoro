import { useAppDispatch } from '../../../store/hooks';
import { setSettingsVisible } from '../../../store/timerSlice';

import SvgButton from '../../UI/Buttons/SvgButton';
import { ReactComponent as SvgCross } from '../../../svgs/x.svg';

const TimerCrossButton = () => {
  const dispatch = useAppDispatch();

  const timerCrossButtonClickHandler = () => {
    dispatch(setSettingsVisible(false));
  };

  return (
    <SvgButton svg={<SvgCross />} clickHandler={timerCrossButtonClickHandler} />
  );
};

export default TimerCrossButton;
