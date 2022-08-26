import { useAppDispatch } from 'hooks';

import { setSettingsVisible } from 'features/timer';

import SvgButton from 'components/SvgButton';
import { ReactComponent as SvgCross } from 'assets/x.svg';

export const TimerSettingsCrossButton = () => {
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
