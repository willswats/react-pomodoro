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
  const { pomodoroMinutes, shortBreakMinutes, longBreakMinutes } =
    state.timerSettings;

  const [pomodoroInputValue, setPomodoroInputValue] = useState(
    `${pomodoroMinutes}`
  );
  const [shortBreakInputValue, setShortBreakInputValue] = useState(
    `${shortBreakMinutes}`
  );
  const [longBreakInputValue, setLongBreakInputValue] = useState(
    `${longBreakMinutes}`
  );

  const settingsFormSubmitHandler = (event: FormEvent) => {
    event.preventDefault();

    const convertedInputValuePomodoro = parseFloat(pomodoroInputValue);
    const convertedInputValueShortBreak = parseFloat(shortBreakInputValue);
    const convertedInputValueLongBreak = parseFloat(longBreakInputValue);

    if (
      !isNaN(convertedInputValuePomodoro) &&
      !isNaN(convertedInputValueShortBreak) &&
      !isNaN(convertedInputValueLongBreak)
    ) {
      dispatch({
        type: ACTIONS.SET_TIMER_SETTINGS,
        payload: {
          ...state,
          timerSettings: {
            ...state.timerSettings,
            pomodoroMinutes: convertedInputValuePomodoro,
            shortBreakMinutes: convertedInputValueShortBreak,
            longBreakMinutes: convertedInputValueLongBreak,
          },
        },
      });
    }
  };

  return (
    <SettingsForm
      body={
        <div className={classes['timer-settings-form-inputs']}>
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
      }
      submitHandler={settingsFormSubmitHandler}
    />
  );
};

export default TimerSettingsForm;
