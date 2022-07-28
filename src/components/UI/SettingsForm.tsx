import { FormEvent } from 'react';

import classes from './SettingsForm.module.css';

const SettingsForm = () => {
  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={submitHandler} className={classes['settings-form']}>
      <h1>Settings</h1>
    </form>
  );
};

export default SettingsForm;
