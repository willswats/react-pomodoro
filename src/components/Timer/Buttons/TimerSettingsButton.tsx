import { useAppDispatch } from '../../../store/hooks';
import { setSettingsVisible } from '../../../store/timerSlice';

import SvgButton from '../../UI/Buttons/SvgButton';
import { ReactComponent as SvgSettings } from '../../../svgs/settings.svg';

const TimerSettingsButton = () => {
  const dispatch = useAppDispatch();

  const settingsButtonClickHandler = () => {
    dispatch(setSettingsVisible(true));
  };

  return (
    <SvgButton
      svg={<SvgSettings />}
      clickHandler={settingsButtonClickHandler}
    />
  );
};

export default TimerSettingsButton;
