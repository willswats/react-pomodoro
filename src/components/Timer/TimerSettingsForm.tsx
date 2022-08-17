import { useState, FormEvent } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setSettings, setSettingsVisible } from '../../store/timerSlice';

import SettingsForm from '../UI/Forms/SettingsForm';
import SettingsInput from '../UI/Inputs/SettingsInput';

import classes from './TimerSettingsForm.module.css';

const TimerSettingsForm = () => {
  const dispatch = useAppDispatch();
  const settings = useAppSelector((state) => state.timer.settings);

  const [pomodoroInputValue, setPomodoroInputValue] = useState(
    `${settings.pomodoroMinutes}`
  );
  const [shortBreakInputValue, setShortBreakInputValue] = useState(
    `${settings.shortBreakMinutes}`
  );
  const [longBreakInputValue, setLongBreakInputValue] = useState(
    `${settings.longBreakMinutes}`
  );
  const [longBreakIntervalInputValue, setLongBreakIntervalInputValue] =
    useState(`${settings.longBreakInterval}`);

  const settingsFormSubmitHandler = (event: FormEvent) => {
    event.preventDefault();

    const pomodoroConvertedInputValue = parseFloat(pomodoroInputValue);
    const shortBreakConvertedInputValue = parseFloat(shortBreakInputValue);
    const longBreakConvertedInputValue = parseFloat(longBreakInputValue);

    const longBreakIntervalConvertedInputValue = parseFloat(
      longBreakIntervalInputValue
    );

    if (
      !isNaN(pomodoroConvertedInputValue) &&
      !isNaN(shortBreakConvertedInputValue) &&
      !isNaN(longBreakConvertedInputValue) &&
      !isNaN(longBreakIntervalConvertedInputValue)
    ) {
      dispatch(
        setSettings({
          pomodoroMinutes: pomodoroConvertedInputValue,
          shortBreakMinutes: shortBreakConvertedInputValue,
          longBreakMinutes: longBreakConvertedInputValue,
          longBreakInterval: longBreakIntervalConvertedInputValue,
        })
      );
      dispatch(setSettingsVisible(false));
    }
  };

  return (
    <SettingsForm
      body={
        <>
          <div className={classes['timer-settings-form-row']}>
            <SettingsInput
              id="pomodoro"
              labelText="Pomodoro"
              inputValue={pomodoroInputValue}
              setInputValue={setPomodoroInputValue}
            />
            <SettingsInput
              id="short-break"
              labelText="Short Break"
              inputValue={shortBreakInputValue}
              setInputValue={setShortBreakInputValue}
            />
            <SettingsInput
              id="long-break"
              labelText="Long Break"
              inputValue={longBreakInputValue}
              setInputValue={setLongBreakInputValue}
            />
          </div>
          <SettingsInput
            id="long-break-interval"
            labelText="Long Break Interval"
            inputValue={longBreakIntervalInputValue}
            setInputValue={setLongBreakIntervalInputValue}
          />
        </>
      }
      submitHandler={settingsFormSubmitHandler}
    />
  );
};

export default TimerSettingsForm;
