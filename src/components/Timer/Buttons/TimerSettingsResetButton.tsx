import { FormEvent } from 'react';

import { useAppDispatch } from '../../../store/hooks';

import SettingsTextButton from '../../UI/Buttons/SettingsTextButton';

const TimerSettingsResetButton = () => {
  const dispatch = useAppDispatch();

  const timerSettingsResetButtonClickHandler = (event: FormEvent) => {
    event.preventDefault();
  };

  return (
    <SettingsTextButton
      text="Reset"
      clickHandler={timerSettingsResetButtonClickHandler}
    />
  );
};

export default TimerSettingsResetButton;
