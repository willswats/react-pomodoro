import classes from './SettingsInput.module.css';

interface SettingsInputProps {
  id: string;
  labelText: string;
}

const SettingsInput = ({ id, labelText }: SettingsInputProps) => {
  return (
    <div className={classes['settings-input']}>
      <label htmlFor={id}>{labelText}</label>
      <input
        className={classes['settings-input__input']}
        id={id}
        type="number"
      />
    </div>
  );
};

export default SettingsInput;
