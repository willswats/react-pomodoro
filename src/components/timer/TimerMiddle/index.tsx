import TimerModes from '../TimerModes';
import TimerCounter from '../TimerCounter';

import styles from './styles.module.css';

const TimerMiddle = () => {
  return (
    <div className={styles['timer-middle']}>
      <TimerModes />
      <TimerCounter />
    </div>
  );
};

export default TimerMiddle;
