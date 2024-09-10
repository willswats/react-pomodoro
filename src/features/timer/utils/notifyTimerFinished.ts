import { TimerState, TIMER_MODES } from '../reducers/timerSlice';

export const notifyTimerFinished = (timer: TimerState) => {
  const sendNotificationTimerFinished = (body: string) => {
    new Notification('React Pomodoro', {
      body: body,
      icon: '/favicon/android-chrome-512x512.png',
    });
  };

  switch (timer.mode) {
    case TIMER_MODES.POMODORO:
      sendNotificationTimerFinished('Pomodoro finished!');
      break;
    case TIMER_MODES.SHORT_BREAK:
      sendNotificationTimerFinished('Short break finished!');
      break;
    case TIMER_MODES.LONG_BREAK:
      sendNotificationTimerFinished('Long break finished!');
      break;
  }
};
