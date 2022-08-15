import { useState, FormEvent } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setSettings, setSettingsVisible } from '../../store/timerSlice';

import SettingsForm from '../UI/Forms/SettingsForm';
import SettingsInput from '../UI/Inputs/SettingsInput';

import classes from './TimerSettingsForm.module.css';

const TimerSettingsForm = () => {
  const dispatch = useAppDispatch();
  const pomodoroMinutes = useAppSelector(
    (state) => state.timer.settings.minutes.pomodoro
  );
  const shortBreakMinutes = useAppSelector(
    (state) => state.timer.settings.minutes.shortBreak
  );
  const longBreakMinutes = useAppSelector(
    (state) => state.timer.settings.minutes.longBreak
  );
  const longBreakInterval = useAppSelector(
    (state) => state.timer.settings.longBreakInterval
  );

  const [pomodoroInputValue, setPomodoroInputValue] = useState(
    `${pomodoroMinutes}`
  );
  const [shortBreakInputValue, setShortBreakInputValue] = useState(
    `${shortBreakMinutes}`
  );
  const [longBreakInputValue, setLongBreakInputValue] = useState(
    `${longBreakMinutes}`
  );
  const [longBreakIntervalInputValue, setLongBreakIntervalInputValue] =
    useState(`${longBreakInterval}`);

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
          minutes: {
            pomodoro: pomodoroConvertedInputValue,
            shortBreak: shortBreakConvertedInputValue,
            longBreak: longBreakConvertedInputValue,
          },
          longBreakInterval: longBreakIntervalConvertedInputValue,
        })
      );
      dispatch(setSettingsVisible(false));
    }
  };

  return (
    <SettingsForm
      body={
        <div className={classes['timer-settings-form-inputs']}>
          <div className={classes['timer-settings-form-inputs__minutes']}>
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
        </div>
      }
      submitHandler={settingsFormSubmitHandler}
    />
  );
};

export default TimerSettingsForm;
