import { MouseEvent } from 'react';

import { useAppDispatch } from '../../../store/hooks';
import { resetSettings } from '../../../store/timerSlice';

import { ReactComponent as SvgRefresh } from '../../../svgs/refresh-cw.svg';
import SvgButton from '../../UI/Buttons/SvgButton';

import classes from './TimerSettingsResetButton.module.css';

const TimerSettingsResetButton = () => {
  const dispatch = useAppDispatch();

  const timerSettingsResetButtonClickHandler = (event: MouseEvent) => {
    event.preventDefault();
    dispatch(resetSettings());
  };

  return (
    <SvgButton
      svg={<SvgRefresh />}
      clickHandler={timerSettingsResetButtonClickHandler}
      extraButtonClassNames={classes['timer-settings-reset-button']}
    />
  );
};

export default TimerSettingsResetButton;
