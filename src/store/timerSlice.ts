import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum TIMER_MODES {
  POMODORO = 'pomodoro',
  SHORT_BREAK = 'short-break',
  LONG_BREAK = 'long-break',
}

interface TimerSettingsState {
  minutes: {
    pomodoro: number;
    shortBreak: number;
    longBreak: number;
  };
  longBreakInterval: number;
}

interface TimerState {
  mode: string;
  running: boolean;
  timeRemaining: { minutes: number; seconds: number };
  pomodoroCount: number;
  settingsVisible: boolean;
  settingsChanged: boolean;
  settings: TimerSettingsState;
}

const initialTimerState: TimerState = {
  mode: TIMER_MODES.POMODORO,
  running: false,
  timeRemaining: {
    minutes: 25,
    seconds: 0,
  },
  pomodoroCount: 0,
  settingsVisible: false,
  settingsChanged: false,
  settings: {
    minutes: {
      pomodoro: 25,
      shortBreak: 5,
      longBreak: 15,
    },
    longBreakInterval: 5,
  },
};

const timerSlice = createSlice({
  name: 'timer',
  initialState: initialTimerState,
  reducers: {
    setMode(state, { payload }: PayloadAction<string>) {
      if (state.mode !== payload) {
        switch (payload) {
          case TIMER_MODES.POMODORO:
            state.timeRemaining.minutes = state.settings.minutes.pomodoro;
            break;
          case TIMER_MODES.SHORT_BREAK:
            state.timeRemaining.minutes = state.settings.minutes.shortBreak;
            break;
          case TIMER_MODES.LONG_BREAK:
            state.timeRemaining.minutes = state.settings.minutes.longBreak;
            break;
        }
        state.timeRemaining.seconds = 0;
        state.running = false;
        state.mode = payload;
      }
    },
    setRunning(state, { payload }: PayloadAction<boolean>) {
      if (
        state.timeRemaining.minutes === 0 &&
        state.timeRemaining.seconds === 0
      ) {
        return;
      }
      state.running = payload;
    },
    setTimeRemaining(
      state,
      { payload }: PayloadAction<{ minutes: number; seconds: number }>
    ) {
      // Stop timer when minutes and seconds are 0
      if (
        state.timeRemaining.minutes === 0 &&
        state.timeRemaining.seconds === 0
      ) {
        // Add to pomodoroCount
        if (state.mode === TIMER_MODES.POMODORO) {
          state.pomodoroCount += 1;
        }
        state.running = false;
      }

      state.timeRemaining = {
        minutes: payload.minutes,
        seconds: payload.seconds,
      };
    },
    setTimeRemainingToSettings(state) {
      switch (state.mode) {
        case TIMER_MODES.POMODORO:
          state.timeRemaining = {
            minutes: state.settings.minutes.pomodoro,
            seconds: 0,
          };
          break;
        case TIMER_MODES.SHORT_BREAK:
          state.timeRemaining = {
            minutes: state.settings.minutes.shortBreak,
            seconds: 0,
          };
          break;
        case TIMER_MODES.LONG_BREAK:
          state.timeRemaining = {
            minutes: state.settings.minutes.longBreak,
            seconds: 0,
          };
      }
      state.running = false;
      state.settingsChanged = false;
    },
    skipBackwards(state) {
      if (state.pomodoroCount > 0) {
        if (state.mode === TIMER_MODES.POMODORO) {
          state.mode = TIMER_MODES.SHORT_BREAK;
          state.timeRemaining = {
            minutes: state.settings.minutes.shortBreak,
            seconds: 0,
          };
        } else {
          state.mode = TIMER_MODES.POMODORO;
          state.timeRemaining = {
            minutes: state.settings.minutes.pomodoro,
            seconds: 0,
          };
          state.pomodoroCount -= 1;
        }
        state.running = false;
      }
    },
    skipForwards(state) {
      // Long break condition
      if (
        state.pomodoroCount + 1 === state.settings.longBreakInterval &&
        state.mode === TIMER_MODES.POMODORO
      ) {
        state.mode = TIMER_MODES.LONG_BREAK;
        state.timeRemaining = {
          minutes: state.settings.minutes.longBreak,
          seconds: 0,
        };
        state.pomodoroCount += 1;
        state.running = false;
        // Add condition
      } else if (state.pomodoroCount !== state.settings.longBreakInterval) {
        if (state.mode === TIMER_MODES.POMODORO) {
          state.mode = TIMER_MODES.SHORT_BREAK;
          state.timeRemaining = {
            minutes: state.settings.minutes.shortBreak,
            seconds: 0,
          };
          state.pomodoroCount += 1;
        } else {
          state.mode = TIMER_MODES.POMODORO;
          state.timeRemaining = {
            minutes: state.settings.minutes.pomodoro,
            seconds: 0,
          };
        }
        state.running = false;
        // Reset condition
      } else if (state.pomodoroCount === state.settings.longBreakInterval) {
        if (state.mode === TIMER_MODES.LONG_BREAK) {
          state.mode = TIMER_MODES.POMODORO;
          state.timeRemaining = {
            minutes: state.settings.minutes.pomodoro,
            seconds: 0,
          };
          state.pomodoroCount = 0;
          state.running = false;
        }
      }
    },

    setSettingsVisible(state, { payload }: PayloadAction<boolean>) {
      state.running = false;
      state.settingsVisible = payload;
    },
    setSettings(state, { payload }: PayloadAction<TimerSettingsState>) {
      state.settingsChanged = true;
      state.settings = {
        minutes: {
          pomodoro: payload.minutes.pomodoro,
          shortBreak: payload.minutes.shortBreak,
          longBreak: payload.minutes.longBreak,
        },
        longBreakInterval: payload.longBreakInterval,
      };
    },
    resetToSettings(state) {
      state.timeRemaining = {
        minutes: state.settings.minutes.pomodoro,
        seconds: 0,
      };
      state.mode = TIMER_MODES.POMODORO;
      state.pomodoroCount = 0;
    },
  },
});

export const {
  setMode,
  setRunning,
  setTimeRemaining,
  skipBackwards,
  skipForwards,
  setTimeRemainingToSettings,
  setSettingsVisible,
  setSettings,
  resetToSettings,
} = timerSlice.actions;

export default timerSlice.reducer;
