import { useState, FormEvent, MouseEvent, ChangeEvent } from 'react';

import { useAppDispatch, useAppSelector } from 'hooks';

import {
  initialTimerState,
  setSettings,
  setSettingsVisible,
  getInputErrorMessage,
} from 'features/timer';

import SvgCross from 'assets/close-line.svg?react';
import SvgCheck from 'assets/check-line.svg?react';
import SvgRefresh from 'assets/refresh-line.svg?react';

import {
  SettingsInputNumber,
  // SettingsButtonCheck,
  SvgButton,
} from 'components';

import styles from './styles.module.css';
// import { SettingsInputRange } from 'components/SettingsInputRange';

export const TimerSettingsForm = () => {
  const dispatch = useAppDispatch();
  const settings = useAppSelector((state) => state.timer.settings);

  const [formValues, setFormValues] = useState({
    pomodoro: `${settings.pomodoro}`,
    shortBreak: `${settings.shortBreak}`,
    longBreak: `${settings.longBreak}`,
    longBreakInterval: `${settings.longBreakInterval}`,
    endSoundVolume: settings.endSoundVolume,
    autoContinue: settings.autoContinue,
  });

  const [formErrors, setFormErrors] = useState({
    pomodoro: '',
    shortBreak: '',
    longBreak: '',
    longBreakInterval: '',
  });

  const settingsFormSubmitHandler = (event: FormEvent) => {
    event.preventDefault();

    const convertedFormValues = {
      pomodoro: parseFloat(formValues.pomodoro),
      shortBreak: parseFloat(formValues.shortBreak),
      longBreak: parseFloat(formValues.longBreak),
      longBreakInterval: parseFloat(formValues.longBreakInterval),
    };

    const errorMessages = {
      pomodoro: getInputErrorMessage('pomodoro', convertedFormValues.pomodoro),
      shortBreak: getInputErrorMessage(
        'short-break',
        convertedFormValues.shortBreak,
      ),
      longBreak: getInputErrorMessage(
        'long-break',
        convertedFormValues.longBreak,
      ),
      longBreakInterval: getInputErrorMessage(
        'long-break-interval',
        convertedFormValues.longBreakInterval,
      ),
    };

    if (
      errorMessages.pomodoro === '' &&
      errorMessages.shortBreak === '' &&
      errorMessages.longBreak === '' &&
      errorMessages.longBreakInterval === ''
    ) {
      dispatch(
        setSettings({
          pomodoro: convertedFormValues.pomodoro,
          shortBreak: convertedFormValues.shortBreak,
          longBreak: convertedFormValues.longBreak,
          longBreakInterval: convertedFormValues.longBreakInterval,
          endSoundVolume: formValues.endSoundVolume,
          autoContinue: formValues.autoContinue,
        }),
      );
      dispatch(setSettingsVisible(false));
    } else {
      setFormErrors(() => {
        return {
          pomodoro: errorMessages.pomodoro,
          shortBreak: errorMessages.shortBreak,
          longBreak: errorMessages.longBreak,
          longBreakInterval: errorMessages.longBreakInterval,
        };
      });
    }
  };

  const SettingsInputNumberChangeHandler = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    // Get id of input and set value of selected input
    const id = event.target.id;
    const value = event.target.value;

    if (value.length <= 2) {
      switch (id) {
        case 'pomodoro':
          setFormValues((state) => {
            return {
              ...state,
              pomodoro: value,
            };
          });
          break;
        case 'short-break':
          setFormValues((state) => {
            return {
              ...state,
              shortBreak: value,
            };
          });
          break;
        case 'long-break':
          setFormValues((state) => {
            return {
              ...state,
              longBreak: value,
            };
          });
          break;
        case 'long-break-interval':
          setFormValues((state) => {
            return {
              ...state,
              longBreakInterval: value,
            };
          });
          break;
      }
    }
  };

  // const endSoundVolumeInputChangeHandler = (
  //   event: ChangeEvent<HTMLInputElement>,
  // ) => {
  //   const value = parseFloat(event.target.value);
  //
  //   setFormValues((state) => {
  //     return {
  //       ...state,
  //       endSoundVolume: value,
  //     };
  //   });
  // };

  // const autoContinueButtonClickHandler = (event: MouseEvent) => {
  //   event.preventDefault();
  //   setFormValues((state) => {
  //     return {
  //       ...state,
  //       autoContinue: !formValues.autoContinue,
  //     };
  //   });
  // };

  const resetButtonClickHandler = (event: MouseEvent) => {
    event.preventDefault();
    setFormValues(() => {
      return {
        pomodoro: `${initialTimerState.settings.pomodoro}`,
        shortBreak: `${initialTimerState.settings.shortBreak}`,
        longBreak: `${initialTimerState.settings.longBreak}`,
        longBreakInterval: `${initialTimerState.settings.longBreakInterval}`,
        endSoundVolume: initialTimerState.settings.endSoundVolume,
        autoContinue: initialTimerState.settings.autoContinue,
      };
    });
  };

  return (
    <form
      onSubmit={settingsFormSubmitHandler}
      className={styles['timer-settings-form']}
      noValidate
    >
      <div className={styles['timer-settings-form__top']}>
        <SvgButton
          svg={<SvgCross />}
          clickHandler={() => dispatch(setSettingsVisible(false))}
        />
      </div>
      <div className={styles['timer-settings-form__middle']}>
        <div className={styles['timer-settings-form__middle-grid']}>
          <SettingsInputNumber
            id="pomodoro"
            labelText="Pomodoro"
            inputMin="1"
            inputMax="99"
            inputValue={formValues.pomodoro}
            changeHandler={SettingsInputNumberChangeHandler}
            errorText={formErrors.pomodoro}
          />
          <SettingsInputNumber
            id="short-break"
            labelText="Short Break"
            inputMin="1"
            inputMax="99"
            inputValue={formValues.shortBreak}
            changeHandler={SettingsInputNumberChangeHandler}
            errorText={formErrors.shortBreak}
          />
          <SettingsInputNumber
            id="long-break"
            labelText="Long Break"
            inputMin="1"
            inputMax="99"
            inputValue={formValues.longBreak}
            changeHandler={SettingsInputNumberChangeHandler}
            errorText={formErrors.longBreak}
          />
          <SettingsInputNumber
            id="long-break-interval"
            labelText="Long Break interval"
            inputMin="1"
            inputMax="10"
            inputValue={formValues.longBreakInterval}
            changeHandler={SettingsInputNumberChangeHandler}
            errorText={formErrors.longBreakInterval}
          />
          {/*
          <SettingsInputRange
            id="end-sound-volume"
            labelText="End sound volume"
            inputMin="0"
            inputMax="100"
            inputStep="10"
            inputValue={formValues.endSoundVolume}
            changeHandler={endSoundVolumeInputChangeHandler}
          />
          <SettingsButtonCheck
            id="auto-continue"
            labelText="Auto continue"
            checked={formValues.autoContinue}
            clickHandler={autoContinueButtonClickHandler}
          />
          */}
        </div>
      </div>
      <div className={styles['timer-settings-form__bottom']}>
        <SvgButton
          svg={<SvgRefresh />}
          clickHandler={resetButtonClickHandler}
        />
        <SvgButton svg={<SvgCheck />} />
      </div>
    </form>
  );
};
