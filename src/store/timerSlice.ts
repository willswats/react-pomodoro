import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export enum MODES {
  POMODORO = 'pomodoro',
  SHORT_BREAK = 'short-break',
  LONG_BREAK = 'long-break',
}

interface State {
  mode: string;
  running: boolean;
  timeRemaining: {
    minutes: number;
    seconds: number;
  };
  pomodoroCount: number;
  settingsVisible: boolean;
  settingsChanged: boolean;
  settings: {
    minutes: {
      pomodoro: number;
      shortBreak: number;
      longBreak: number;
    };
    longBreakInterval: number;
  };
}

const initialState: State = {
  mode: MODES.POMODORO,
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
  initialState,
  reducers: {
    setMode(state, { payload }: PayloadAction<string>) {
      state.mode = payload;
      state.running = false;
      switch (payload) {
        case MODES.POMODORO:
          state.timeRemaining.minutes = state.settings.minutes.pomodoro;
          break;
        case MODES.SHORT_BREAK:
          state.timeRemaining.minutes = state.settings.minutes.shortBreak;
          break;
        case MODES.LONG_BREAK:
          state.timeRemaining.minutes = state.settings.minutes.longBreak;
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
        if (state.mode === MODES.POMODORO) {
          state.pomodoroCount += 1;
        }
        state.running = false;
      } else {
        state.timeRemaining = {
          minutes: payload.minutes,
          seconds: payload.seconds,
        };
      }
    },
    setTimeRemainingToSettings(state) {
      if (state.running !== true && state.settingsChanged === true) {
        switch (state.mode) {
          case MODES.POMODORO:
            state.settingsChanged = false;
            state.timeRemaining = {
              minutes: state.settings.minutes.pomodoro,
              seconds: 0,
            };
            break;
          case MODES.SHORT_BREAK:
            state.settingsChanged = false;
            state.timeRemaining = {
              minutes: state.settings.minutes.shortBreak,
              seconds: 0,
            };
            break;
          case MODES.LONG_BREAK:
            state.settingsChanged = false;
            state.timeRemaining = {
              minutes: state.settings.minutes.longBreak,
              seconds: 0,
            };
        }
      }
    },
    setPomodoroCount(state, { payload }: PayloadAction<number>) {},
    setSettingsVisible(state, { payload }: PayloadAction<boolean>) {
      state.running = false;
      state.settingsVisible = payload;
    },
    setSettings(
      state,
      {
        payload,
      }: PayloadAction<{
        minutes: { pomodoro: number; shortBreak: number; longBreak: number };
        longBreakInterval: number;
      }>
    ) {
      state.settings = {
        minutes: {
          pomodoro: payload.minutes.pomodoro,
          shortBreak: payload.minutes.shortBreak,
          longBreak: payload.minutes.longBreak,
        },
        longBreakInterval: payload.longBreakInterval,
      };
    },
  },
});

export const {
  setMode,
  setRunning,
  setTimeRemaining,
  setTimeRemainingToSettings,
  setPomodoroCount,
  setSettingsVisible,
  setSettings,
} = timerSlice.actions;

export default timerSlice.reducer;
