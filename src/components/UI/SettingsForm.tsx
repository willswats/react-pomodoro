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
  const [inputValuePomodoro, setInputValuePomodoro] = useState(
    state.settings.pomodoro
  );
  const [inputValueShortBreak, setInputValueShortBreak] = useState(
    state.settings.shortBreak
  );
  const [inputValueLongBreak, setInputValueLongBreak] = useState(
    state.settings.longBreak
  );

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();

    if (
      isNaN(inputValuePomodoro) ||
      isNaN(inputValueShortBreak) ||
      isNaN(inputValueLongBreak)
    ) {
      return;
    }

    dispatch({
      type: ACTIONS.SET_SETTINGS,
      payload: {
        ...state,
        settings: {
          pomodoro: inputValuePomodoro,
          shortBreak: inputValueShortBreak,
          longBreak: inputValueLongBreak,
        },
      },
    });
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