import { FormEvent } from 'react';

import SaveSettingsButton from '../Buttons/SaveSettingsButton';

import classes from './SettingsForm.module.css';

interface SettingsFormProps {
  body: JSX.Element;
  submitHandler: (event: FormEvent) => void;
}

const SettingsForm = ({ body, submitHandler }: SettingsFormProps) => {
  return (
    <form onSubmit={submitHandler} className={classes['settings-form']}>
      <h1>Settings</h1>
      {body}
      <div className={classes['settings-form__save-settings-button']}>
        <SaveSettingsButton />
      </div>
    </form>
  );
};

export default SettingsForm;
