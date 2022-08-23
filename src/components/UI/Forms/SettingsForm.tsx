import { FormEvent } from 'react';

import classes from './SettingsForm.module.css';

interface SettingsFormProps {
  saveButton: JSX.Element;
  resetButton: JSX.Element;
  exitButton: JSX.Element;
  body: JSX.Element;
  submitHandler: (event: FormEvent) => void;
}

const SettingsForm = ({
  saveButton,
  resetButton,
  exitButton,
  body,
  submitHandler,
}: SettingsFormProps) => {
  return (
    <form onSubmit={submitHandler} className={classes['settings-form']}>
      <div className={classes['settings-form__top']}>
        <h1 className={classes['settings-form__title']}>Settings</h1>
        {exitButton}
      </div>
      <div className={classes['settings-form__middle']}>
        <div className={classes['settings-form__middle-grid']}>{body}</div>
      </div>
      <div className={classes['settings-form__bottom']}>
        {resetButton}
        {saveButton}
      </div>
    </form>
  );
};

export default SettingsForm;
