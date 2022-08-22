import { FormEvent } from 'react';

import SaveButton from '../Buttons/SaveButton';

import classes from './SettingsForm.module.css';

interface SettingsFormProps {
  crossButton: JSX.Element;
  body: JSX.Element;
  submitHandler: (event: FormEvent) => void;
}

const SettingsForm = ({
  crossButton,
  body,
  submitHandler,
}: SettingsFormProps) => {
  return (
    <form onSubmit={submitHandler} className={classes['settings-form']}>
      <div className={classes['settings-form__top']}>
        <h1 className={classes['settings-form__title']}>Settings</h1>
        {crossButton}
      </div>
      <div className={classes['settings-form__content']}>{body}</div>
      <div className={classes['settings-form__bottom']}>
        <SaveButton />
      </div>
    </form>
  );
};

export default SettingsForm;
