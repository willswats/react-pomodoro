import { useState, FormEvent, MouseEvent, ChangeEvent } from 'react';

import { useAppDispatch, useAppSelector } from 'hooks';

import {
  initialTimerState,
  setSettings,
  setSettingsVisible,
} from 'features/timer';

import { ReactComponent as SvgCross } from 'assets/x.svg';
import { ReactComponent as SvgCheck } from 'assets/check.svg';
import { ReactComponent as SvgRestart } from 'assets/refresh-cw.svg';

import { SettingsInput, SvgButton } from 'components';

import styles from './styles.module.css';

export const TimerSettingsForm = () => {
  const dispatch = useAppDispatch();
  const settings = useAppSelector((state) => state.timer.settings);

  const [inputValues, setInputValues] = useState({
    pomodoro: `${settings.pomodoro}`,
    shortBreak: `${settings.shortBreak}`,
    longBreak: `${settings.longBreak}`,
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
          pomodoro: convertedInputValues.pomodoro,
          shortBreak: convertedInputValues.shortBreak,
          longBreak: convertedInputValues.longBreak,
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
        pomodoro: `${initialTimerState.settings.pomodoro}`,
        shortBreak: `${initialTimerState.settings.shortBreak}`,
        longBreak: `${initialTimerState.settings.longBreak}`,
        longBreakInterval: `${initialTimerState.settings.longBreakInterval}`,
      };
    });
  };

  return (
    <form
      onSubmit={settingsFormSubmitHandler}
      className={styles['timer-settings-form']}
    >
      <div className={styles['timer-settings-form__top']}>
        <h1 className={styles['timer-settings-form__title']}>Settings</h1>
        <SvgButton
          svg={<SvgCross />}
          clickHandler={() => dispatch(setSettingsVisible(false))}
        />
      </div>
      <div className={styles['timer-settings-form__middle']}>
        <div className={styles['timer-settings-form__middle-grid']}>
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
      <div className={styles['timer-settings-form__bottom']}>
        <SvgButton
          svg={<SvgRestart />}
          clickHandler={resetButtonClickHandler}
        />
        <SvgButton svg={<SvgCheck />} />
      </div>
    </form>
  );
};