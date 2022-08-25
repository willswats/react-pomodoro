import TimerTop from 'components/timer/TimerTop';
import TimerMiddle from 'components/timer/TimerMiddle';
import TimerBottom from 'components/timer/TimerBottom';
import TimerSettingsForm from 'components/timer/TimerSettingsForm';

import { useAppSelector } from 'store/hooks';

import styles from './styles.module.css';

const Timer = () => {
  const timer = useAppSelector((state) => state.timer);

  return (
    <div className={styles['timer']}>
      <div className={styles['timer__content']}>
        {!timer.settingsVisible ? (
          <>
            <TimerTop />
            <TimerMiddle />
            <TimerBottom />
          </>
        ) : (
          <TimerSettingsForm />
        )}
      </div>
    </div>
  );
};

export default Timer;
