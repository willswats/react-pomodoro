import { Dispatch, useState, FormEvent } from 'react';

import { State, Action, ACTIONS } from '../Timer';

import SettingsInput from './SettingsInput';
import SaveSettingsButton from './Buttons/SaveSettingsButton';

import classes from './SettingsForm.module.css';

interface SettingsFormProps {
  state: State;
  dispatch: Dispatch<Action>;
}

const SettingsForm = ({ state, dispatch }: SettingsFormProps) => {
  const { timerSettings } = state;

  const [inputValuePomodoro, setInputValuePomodoro] = useState(
    `${timerSettings.pomodoro}`
  );
  const [inputValueShortBreak, setInputValueShortBreak] = useState(
    `${timerSettings.shortBreak}`
  );
  const [inputValueLongBreak, setInputValueLongBreak] = useState(
    `${timerSettings.longBreak}`
  );

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();

    const convertedInputValuePomodoro = parseFloat(inputValuePomodoro);
    const convertedInputValueShortBreak = parseFloat(inputValueShortBreak);
    const convertedInputValueLongBreak = parseFloat(inputValueLongBreak);

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
            pomodoro: convertedInputValuePomodoro,
            shortBreak: convertedInputValueShortBreak,
            longBreak: convertedInputValueLongBreak,
          },
        },
      });

      dispatch({
        type: ACTIONS.SET_TIMER_SETTINGS_VISIBLE,
        payload: { ...state, timerSettingsVisible: false },
      });
    }
  };

  return (
    <form onSubmit={submitHandler} className={classes['settings-form']}>
      <h1>Settings</h1>
      <div className={classes['settings-form__inputs']}>
        <SettingsInput
          id="pomodoro"
          labelText="Pomodoro"
          inputValue={inputValuePomodoro}
          setInputValue={setInputValuePomodoro}
        />
        <SettingsInput
          id="short-break"
          labelText="Short Break"
          inputValue={inputValueShortBreak}
          setInputValue={setInputValueShortBreak}
        />
        <SettingsInput
          id="long-break"
          labelText="Long Break"
          inputValue={inputValueLongBreak}
          setInputValue={setInputValueLongBreak}
        />
      </div>
      <div className={classes['settings-form__save-settings-button']}>
        <SaveSettingsButton />
      </div>
    </form>
  );
};

export default SettingsForm;
