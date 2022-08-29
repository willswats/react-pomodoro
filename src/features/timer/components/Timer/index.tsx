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

import { ReactComponent as SvgRestart } from 'assets/refresh-cw.svg';
import { ReactComponent as SvgSettings } from 'assets/settings.svg';
import { ReactComponent as SvgSkipBackwards } from 'assets/skip-back.svg';
import { ReactComponent as SvgSkipForwards } from 'assets/skip-forward.svg';
import { ReactComponent as SvgPlay } from 'assets/play.svg';
import { ReactComponent as SvgPause } from 'assets/pause.svg';

import styles from './styles.module.css';

export const Timer = () => {
  const dispatch = useAppDispatch();
  const timer = useAppSelector((state) => state.timer);

  return (
    <div className={styles['timer']}>
      <div className={styles['timer__content']}>
        {!timer.settingsVisible ? (
          <>
            <div className={styles['timer__top']}>
              <SvgButton
                svg={<SvgRestart />}
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
    </div>
  );
};
