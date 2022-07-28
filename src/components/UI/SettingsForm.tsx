import { FormEvent } from 'react';

import SaveSettingsButton from './Buttons/SaveSettingsButton';
import SettingsInput from './SettingsInput';

import classes from './SettingsForm.module.css';

const SettingsForm = () => {
  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={submitHandler} className={classes['settings-form']}>
      <h1>Settings</h1>
      <div className={classes['settings-form__inputs']}>
        <SettingsInput id="pomodoro" labelText="Pomodoro" />
        <SettingsInput id="short-break" labelText="Short Break" />
        <SettingsInput id="long-break" labelText="Long Break" />
      </div>
      <SaveSettingsButton />
    </form>
  );
};

export default SettingsForm;
