import { useState, FormEvent, Dispatch } from 'react';

import { Action, State, ACTIONS } from './Timer';

import SettingsForm from '../UI/Forms/SettingsForm';
import SettingsInput from '../UI/Inputs/SettingsInput';

import classes from './TimerSettingsForm.module.css';

interface TimerSettingsFormProps {
  state: State;
  dispatch: Dispatch<Action>;
}

const TimerSettingsForm = ({ state, dispatch }: TimerSettingsFormProps) => {
  const {
    pomodoroMinutes,
    shortBreakMinutes,
    longBreakMinutes,
    longBreakInterval,
  } = state.timerSettings;

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

    console.log(longBreakIntervalConvertedInputValue);

    if (
      !isNaN(pomodoroConvertedInputValue) &&
      !isNaN(shortBreakConvertedInputValue) &&
      !isNaN(longBreakConvertedInputValue) &&
      !isNaN(longBreakIntervalConvertedInputValue)
    ) {
      dispatch({
        type: ACTIONS.SET_TIMER_SETTINGS,
        payload: {
          ...state,
          timerSettings: {
            ...state.timerSettings,
            pomodoroMinutes: pomodoroConvertedInputValue,
            shortBreakMinutes: shortBreakConvertedInputValue,
            longBreakMinutes: longBreakConvertedInputValue,
            longBreakInterval: longBreakIntervalConvertedInputValue,
          },
        },
      });
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
