import { FormEvent } from 'react';

import SettingsForm from '../UI/Forms/SettingsForm';

const TimerSettingsForm = () => {
  const settingsFormSubmitHandler = (event: FormEvent) => {
    event.preventDefault();
  };

  return <SettingsForm submitHandler={settingsFormSubmitHandler} />;
};

export default TimerSettingsForm;
