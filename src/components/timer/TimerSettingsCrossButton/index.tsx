import { useAppDispatch } from 'store/hooks';
import { setSettingsVisible } from 'store/timerSlice';

import SvgButton from 'components/ui/SvgButton';
import { ReactComponent as SvgCross } from 'assets/svgs/x.svg';

const TimerSettingsCrossButton = () => {
  const dispatch = useAppDispatch();

  const timerSettingsCrossButtonClickHandler = () => {
    dispatch(setSettingsVisible(false));
  };

  return (
    <SvgButton
      svg={<SvgCross />}
      clickHandler={timerSettingsCrossButtonClickHandler}
    />
  );
};

export default TimerSettingsCrossButton;
