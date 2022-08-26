import { useAppDispatch } from 'hooks';

import { setSettingsVisible } from 'features/timer';

import SvgButton from 'components/SvgButton';
import { ReactComponent as SvgSettings } from 'assets/settings.svg';

export const TimerSettingsButton = () => {
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
