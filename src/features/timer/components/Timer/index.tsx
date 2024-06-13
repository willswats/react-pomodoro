import {
  TimerIndicators,
  TimerModes,
  TimerCounter,
  TimerSettingsForm,
  resetToSettings,
  setSettingsVisible,
  setPomodoroCountBackwards,
  setPomodoroCountForwards,
  setRunning,
} from 'features/timer';

import { SvgButton } from 'components';

import { useAppSelector, useAppDispatch } from 'hooks';

import SvgRefresh from 'assets/refresh-line.svg?react';
import SvgSettings from 'assets/settings-5-line.svg?react';
import SvgSkipBackwards from 'assets/skip-back-line.svg?react';
import SvgSkipForwards from 'assets/skip-forward-line.svg?react';
import SvgPlay from 'assets/play-line.svg?react';
import SvgPause from 'assets/pause-line.svg?react';

import styles from './styles.module.css';

export const Timer = () => {
  const dispatch = useAppDispatch();
  const timer = useAppSelector((state) => state.timer);

  return (
    <main className={styles['timer']}>
      <div className={styles['timer__content']}>
        {!timer.settingsVisible ? (
          <>
            <div className={styles['timer__top']}>
              <SvgButton
                svg={<SvgRefresh />}
                clickHandler={() => dispatch(resetToSettings())}
              />
              <SvgButton
                svg={<SvgSettings />}
                clickHandler={() => dispatch(setSettingsVisible(true))}
              />
            </div>
            <div className={styles['timer__middle']}>
              <TimerIndicators />
              <TimerModes />
              <TimerCounter />
            </div>
            <div className={styles['timer__bottom']}>
              <SvgButton
                svg={<SvgSkipBackwards />}
                clickHandler={() => dispatch(setPomodoroCountBackwards())}
              />
              {timer.running === false ? (
                <SvgButton
                  svg={<SvgPlay />}
                  clickHandler={() => dispatch(setRunning(true))}
                />
              ) : (
                <SvgButton
                  svg={<SvgPause />}
                  clickHandler={() => dispatch(setRunning(false))}
                />
              )}
              <SvgButton
                svg={<SvgSkipForwards />}
                clickHandler={() => dispatch(setPomodoroCountForwards())}
              />
            </div>
          </>
        ) : (
          <TimerSettingsForm />
        )}
      </div>
    </main>
  );
};
