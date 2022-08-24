import { useState, FormEvent, MouseEvent, ChangeEvent } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  initialTimerState,
  setSettings,
  setSettingsVisible,
} from '../../store/timerSlice';

import { ReactComponent as SvgCheck } from '../../svgs/check.svg';
import { ReactComponent as SvgRefresh } from '../../svgs/refresh-cw.svg';

import SettingsInput from '../UI/Inputs/SettingsInput';
import SvgButton from '../UI/Buttons/SvgButton';
import TimerCrossButton from './Buttons/TimerSettingsCrossButton';

import classes from './TimerSettingsForm.module.css';

const TimerSettingsForm = () => {
  const dispatch = useAppDispatch();
  const settings = useAppSelector((state) => state.timer.settings);

  const [inputValues, setInputValues] = useState({
    pomodoro: `${settings.pomodoroMinutes}`,
    shortBreak: `${settings.shortBreakMinutes}`,
    longBreak: `${settings.longBreakMinutes}`,
    longBreakInterval: `${settings.longBreakInterval}`,
  });

  const settingsFormSubmitHandler = (event: FormEvent) => {
    event.preventDefault();

    const convertedInputValues = {
      pomodoro: parseFloat(inputValues.pomodoro),
      shortBreak: parseFloat(inputValues.shortBreak),
      longBreak: parseFloat(inputValues.longBreak),
      longBreakInterval: parseFloat(inputValues.longBreakInterval),
    };
    if (
      !isNaN(convertedInputValues.pomodoro) &&
      !isNaN(convertedInputValues.shortBreak) &&
      !isNaN(convertedInputValues.longBreak) &&
      !isNaN(convertedInputValues.longBreakInterval)
    ) {
      dispatch(
        setSettings({
          pomodoroMinutes: convertedInputValues.pomodoro,
          shortBreakMinutes: convertedInputValues.shortBreak,
          longBreakMinutes: convertedInputValues.longBreak,
          longBreakInterval: convertedInputValues.longBreakInterval,
        })
      );
      dispatch(setSettingsVisible(false));
    }
  };

  const inputValueChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const id = event.target.id;
    const value = event.target.value;
    switch (id) {
      case 'pomodoro':
        setInputValues((state) => {
          return {
            ...state,
            pomodoro: value,
          };
        });
        break;
      case 'short-break':
        setInputValues((state) => {
          return {
            ...state,
            shortBreak: value,
          };
        });
        break;
      case 'long-break':
        setInputValues((state) => {
          return {
            ...state,
            longBreak: value,
          };
        });
        break;
      case 'long-break-interval':
        setInputValues((state) => {
          return {
            ...state,
            longBreakInterval: value,
          };
        });
        break;
    }
  };

  const resetButtonClickHandler = (event: MouseEvent) => {
    event.preventDefault();
    setInputValues(() => {
      return {
        pomodoro: `${initialTimerState.settings.pomodoroMinutes}`,
        shortBreak: `${initialTimerState.settings.shortBreakMinutes}`,
        longBreak: `${initialTimerState.settings.longBreakMinutes}`,
        longBreakInterval: `${initialTimerState.settings.longBreakInterval}`,
      };
    });
  };

  return (
    <form
      onSubmit={settingsFormSubmitHandler}
      className={classes['timer-settings-form']}
    >
      <div className={classes['timer-settings-form__top']}>
        <h1 className={classes['timer-settings-form__title']}>Settings</h1>
        <TimerCrossButton />
      </div>
      <div className={classes['timer-settings-form__middle']}>
        <div className={classes['timer-settings-form__middle-grid']}>
          <SettingsInput
            id="pomodoro"
            labelText="Pomodoro"
            inputValue={inputValues.pomodoro}
            changeHandler={inputValueChangeHandler}
          />
          <SettingsInput
            id="short-break"
            labelText="Short Break"
            inputValue={inputValues.shortBreak}
            changeHandler={inputValueChangeHandler}
          />
          <SettingsInput
            id="long-break"
            labelText="Long Break"
            inputValue={inputValues.longBreak}
            changeHandler={inputValueChangeHandler}
          />
          <SettingsInput
            id="long-break-interval"
            labelText="Long Break Interval"
            inputValue={inputValues.longBreakInterval}
            changeHandler={inputValueChangeHandler}
          />
        </div>
      </div>
      <div className={classes['timer-settings-form__bottom']}>
        <SvgButton
          svg={<SvgRefresh />}
          clickHandler={resetButtonClickHandler}
        />
        <SvgButton svg={<SvgCheck />} />
      </div>
    </form>
  );
};

export default TimerSettingsForm;
