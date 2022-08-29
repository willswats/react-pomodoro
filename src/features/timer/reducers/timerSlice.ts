import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum TIMER_MODES {
  POMODORO = 'pomodoro',
  SHORT_BREAK = 'short-break',
  LONG_BREAK = 'long-break',
}

interface TimerSettingsState {
  pomodoro: number;
  shortBreak: number;
  longBreak: number;
  longBreakInterval: number;
}

interface TimerState {
  mode: string;
  running: boolean;
  timeRemaining: { minutes: number; seconds: number };
  pomodoroCount: number;
  settingsVisible: boolean;
  settings: TimerSettingsState;
  settingsChanged: {
    pomodoro: boolean;
    shortBreak: boolean;
    longBreak: boolean;
  };
}

export const initialTimerState: TimerState = {
  mode: TIMER_MODES.POMODORO,
  running: false,
  timeRemaining: {
    minutes: 25,
    seconds: 0,
  },
  pomodoroCount: 0,
  settingsVisible: false,
  settings: {
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15,
    longBreakInterval: 5,
  },
  settingsChanged: {
    pomodoro: false,
    shortBreak: false,
    longBreak: false,
  },
};

const timerSlice = createSlice({
  name: 'timer',
  initialState: initialTimerState,
  reducers: {
    setMode(state, { payload }: PayloadAction<string>) {
      state.mode = payload;
      state.running = false;
      state.timeRemaining.seconds = 0;

      if (state.mode !== payload) {
        switch (payload) {
          case TIMER_MODES.POMODORO:
            state.timeRemaining.minutes = state.settings.pomodoro;
            break;
          case TIMER_MODES.SHORT_BREAK:
            state.timeRemaining.minutes = state.settings.shortBreak;
            break;
          case TIMER_MODES.LONG_BREAK:
            state.timeRemaining.minutes = state.settings.longBreak;
            break;
        }
      }
    },
    setRunning(state, { payload }: PayloadAction<boolean>) {
      state.running = payload;
    },
    setTimeRemaining(
      state,
      { payload }: PayloadAction<{ minutes: number; seconds: number }>
    ) {
      // Stop running when minutes and seconds are less than or equal to 0
      if (
        state.timeRemaining.minutes <= 0 &&
        state.timeRemaining.seconds <= 0
      ) {
        state.running = false;
      } else {
        state.timeRemaining = {
          minutes: payload.minutes,
          seconds: payload.seconds,
        };
      }
    },
    setTimeRemainingToSettings(state) {
      if (
        state.mode === TIMER_MODES.POMODORO &&
        state.settingsChanged.pomodoro === true
      ) {
        state.settingsChanged.pomodoro = false;
        state.timeRemaining = {
          minutes: state.settings.pomodoro,
          seconds: 0,
        };
      } else if (
        state.mode === TIMER_MODES.SHORT_BREAK &&
        state.settingsChanged.shortBreak === true
      ) {
        state.settingsChanged.shortBreak = false;
        state.timeRemaining = {
          minutes: state.settings.shortBreak,
          seconds: 0,
        };
      } else if (
        state.mode === TIMER_MODES.LONG_BREAK &&
        state.settingsChanged.longBreak === true
      ) {
        state.settingsChanged.longBreak = false;
        state.timeRemaining = {
          minutes: state.settings.longBreak,
          seconds: 0,
        };
      } else {
        state.settingsChanged = {
          pomodoro: false,
          shortBreak: false,
          longBreak: false,
        };
      }
    },
    setPomodoroCountBackwards(state) {
      if (state.pomodoroCount > 0) {
        if (state.mode === TIMER_MODES.POMODORO) {
          state.mode = TIMER_MODES.SHORT_BREAK;
          state.timeRemaining = {
            minutes: state.settings.shortBreak,
            seconds: 0,
          };
        } else {
          state.mode = TIMER_MODES.POMODORO;
          state.timeRemaining = {
            minutes: state.settings.pomodoro,
            seconds: 0,
          };
          state.pomodoroCount -= 1;
        }
        state.running = false;
      }
    },
    setPomodoroCountForwards(state) {
      // Long break condition
      if (
        state.pomodoroCount + 1 === state.settings.longBreakInterval &&
        state.mode === TIMER_MODES.POMODORO
      ) {
        state.mode = TIMER_MODES.LONG_BREAK;
        state.timeRemaining = {
          minutes: state.settings.longBreak,
          seconds: 0,
        };
        state.pomodoroCount += 1;
        state.running = false;
        // Add condition
      } else if (state.pomodoroCount !== state.settings.longBreakInterval) {
        if (state.mode === TIMER_MODES.POMODORO) {
          state.mode = TIMER_MODES.SHORT_BREAK;
          state.timeRemaining = {
            minutes: state.settings.shortBreak,
            seconds: 0,
          };
          state.pomodoroCount += 1;
        } else {
          state.mode = TIMER_MODES.POMODORO;
          state.timeRemaining = {
            minutes: state.settings.pomodoro,
            seconds: 0,
          };
        }
        state.running = false;
        // Reset condition
      } else if (state.pomodoroCount === state.settings.longBreakInterval) {
        state.mode = TIMER_MODES.POMODORO;
        state.timeRemaining = {
          minutes: state.settings.pomodoro,
          seconds: 0,
        };
        state.pomodoroCount = 0;
        state.running = false;
      }
    },
    setPomodoroCount(state, { payload }: PayloadAction<number>) {
      state.running = false;
      state.pomodoroCount = payload;
    },
    setSettingsVisible(state, { payload }: PayloadAction<boolean>) {
      state.running = false;
      state.settingsVisible = payload;
    },
    setSettings(state, { payload }: PayloadAction<TimerSettingsState>) {
      if (state.settings.pomodoro !== payload.pomodoro) {
        state.settingsChanged.pomodoro = true;
      }
      if (state.settings.shortBreak !== payload.shortBreak) {
        state.settingsChanged.shortBreak = true;
      }
      if (state.settings.longBreak !== payload.longBreak) {
        state.settingsChanged.longBreak = true;
      }

      state.settings = {
        pomodoro: payload.pomodoro,
        shortBreak: payload.shortBreak,
        longBreak: payload.longBreak,
        longBreakInterval: payload.longBreakInterval,
      };
    },
    resetToSettings(state) {
      state.running = false;
      state.pomodoroCount = 0;
      state.mode = TIMER_MODES.POMODORO;
      state.timeRemaining = {
        minutes: state.settings.pomodoro,
        seconds: 0,
      };
    },
  },
});

export const {
  setMode,
  setRunning,
  setTimeRemaining,
  setTimeRemainingToSettings,
  setPomodoroCountBackwards,
  setPomodoroCountForwards,
  setPomodoroCount,
  setSettingsVisible,
  setSettings,
  resetToSettings,
} = timerSlice.actions;

export const timerReducer = timerSlice.reducer;
