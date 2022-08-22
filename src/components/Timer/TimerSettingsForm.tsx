import { useState, FormEvent, ChangeEvent } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setSettings, setSettingsVisible } from '../../store/timerSlice';

import SettingsForm from '../UI/Forms/SettingsForm';
import SettingsInput from '../UI/Inputs/SettingsInput';
import TimerCrossButton from './Buttons/TimerCrossButton';

const TimerSettingsForm = () => {
  const dispatch = useAppDispatch();
  const settings = useAppSelector((state) => state.timer.settings);

  const [inputValues, setInputValues] = useState({
    pomodoro: `${settings.pomodoroMinutes}`,
    shortBreak: `${settings.shortBreakMinutes}`,
    longBreak: `${settings.longBreakMinutes}`,
    longBreakInterval: `${settings.longBreakInterval}`,
  });

  const settingsFormSubmitHandler = (event: FormEvent) => {
    event.preventDefault();

    const convertedInputValues = {
      pomodoro: parseFloat(inputValues.pomodoro),
      shortBreak: parseFloat(inputValues.shortBreak),
      longBreak: parseFloat(inputValues.longBreak),
      longBreakInterval: parseFloat(inputValues.longBreakInterval),
    };
    if (
      !isNaN(convertedInputValues.pomodoro) &&
      !isNaN(convertedInputValues.shortBreak) &&
      !isNaN(convertedInputValues.longBreak) &&
      !isNaN(convertedInputValues.longBreakInterval)
    ) {
      dispatch(
        setSettings({
          pomodoroMinutes: convertedInputValues.pomodoro,
          shortBreakMinutes: convertedInputValues.shortBreak,
          longBreakMinutes: convertedInputValues.longBreak,
          longBreakInterval: convertedInputValues.longBreakInterval,
        })
      );
      dispatch(setSettingsVisible(false));
    }
  };

  const inputValueChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const id = event.target.id;
    const value = event.target.value;
    switch (id) {
      case 'pomodoro':
        setInputValues((state) => {
          return {
            ...state,
            pomodoro: value,
          };
        });
        break;
      case 'short-break':
        setInputValues((state) => {
          return {
            ...state,
            shortBreak: value,
          };
        });
        break;
      case 'long-break':
        setInputValues((state) => {
          return {
            ...state,
            longBreak: value,
          };
        });
        break;
      case 'long-break-interval':
        setInputValues((state) => {
          return {
            ...state,
            longBreakInterval: value,
          };
        });
        break;
    }
  };

  return (
    <SettingsForm
      crossButton={<TimerCrossButton />}
      body={
        <>
          <SettingsInput
            id="pomodoro"
            labelText="Pomodoro"
            inputValue={inputValues.pomodoro}
            changeHandler={inputValueChangeHandler}
          />
          <SettingsInput
            id="short-break"
            labelText="Short Break"
            inputValue={inputValues.shortBreak}
            changeHandler={inputValueChangeHandler}
          />
          <SettingsInput
            id="long-break"
            labelText="Long Break"
            inputValue={inputValues.longBreak}
            changeHandler={inputValueChangeHandler}
          />
          <SettingsInput
            id="long-break-interval"
            labelText="Long Break Interval"
            inputValue={inputValues.longBreakInterval}
            changeHandler={inputValueChangeHandler}
          />
        </>
      }
      submitHandler={settingsFormSubmitHandler}
    />
  );
};

export default TimerSettingsForm;
