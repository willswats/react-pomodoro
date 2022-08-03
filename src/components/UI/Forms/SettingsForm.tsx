import { FormEvent } from 'react';

import SettingsInput from '../Inputs/SettingsInput';
import SaveSettingsButton from '../Buttons/SaveSettingsButton';

import classes from './SettingsForm.module.css';

interface SettingsFormProps {
  submitHandler: (event: FormEvent) => void;
}

const SettingsForm = ({ submitHandler }: SettingsFormProps) => {
  return (
    <form onSubmit={submitHandler} className={classes['settings-form']}>
      <p>Settings</p>
      <SettingsInput id="pomodoro" labelText="Pomodoro" />
      <SettingsInput id="short-break" labelText="Short Break" />
      <SettingsInput id="long-break" labelText="Long Break" />
      <SaveSettingsButton />
    </form>
  );
};

export default SettingsForm;
