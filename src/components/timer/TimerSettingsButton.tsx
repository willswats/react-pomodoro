import { useAppDispatch } from 'store/hooks';
import { setSettingsVisible } from 'store/timerSlice';

import SvgButton from 'components/common/SvgButton';
import { ReactComponent as SvgSettings } from 'assets/svgs/settings.svg';

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
