import { Dispatch } from 'react';
import { State, Action, ACTIONS } from './Timer';

import SvgButton from '../UI/Buttons/SvgButton';

import { ReactComponent as SvgSkipBack } from '../../svgs/skip-back.svg';
import { ReactComponent as SvgSkipForward } from '../../svgs/skip-forward.svg';
import { ReactComponent as SvgPlay } from '../../svgs/play.svg';
import { ReactComponent as SvgPause } from '../../svgs/pause.svg';

import classes from './TimerBottom.module.css';

interface TimerBottomProps {
  state: State;
  dispatch: Dispatch<Action>;
}

const TimerBottom = ({ state, dispatch }: TimerBottomProps) => {
  const { timerRunning } = state;

  const startButtonClickHandler = () => {
    dispatch({
      type: ACTIONS.SET_TIMER_RUNNING,
      payload: { ...state, timerRunning: true },
    });
  };

  const stopButtonClickHandler = () => {
    dispatch({
      type: ACTIONS.SET_TIMER_RUNNING,
      payload: { ...state, timerRunning: false },
    });
  };

  const skipBackButtonClickHandler = () => {
    if (state.pomodoroCount.completed <= 0) {
      return;
    }

    dispatch({
      type: ACTIONS.SET_POMODORO_COUNT,
      payload: {
        ...state,
        pomodoroCount: {
          completed: state.pomodoroCount.completed - 1,
          remaining: state.pomodoroCount.remaining,
        },
      },
    });
  };

  const skipForwardButtonClickHandler = () => {
    if (state.pomodoroCount.completed === state.pomodoroCount.remaining) {
      return;
    }

    dispatch({
      type: ACTIONS.SET_POMODORO_COUNT,
      payload: {
        ...state,
        pomodoroCount: {
          completed: state.pomodoroCount.completed + 1,
          remaining: state.pomodoroCount.remaining,
        },
      },
    });
  };

  return (
    <div className={classes['timer-bottom']}>
      <SvgButton
        svg={<SvgSkipBack />}
        extraButtonClassNames={classes['timer-bottom__skip-back-button']}
        clickHandler={skipBackButtonClickHandler}
      />
      {timerRunning === false ? (
        <SvgButton svg={<SvgPlay />} clickHandler={startButtonClickHandler} />
      ) : (
        <SvgButton svg={<SvgPause />} clickHandler={stopButtonClickHandler} />
      )}
      <SvgButton
        svg={<SvgSkipForward />}
        extraButtonClassNames={classes['timer-bottom__skip-forward-button']}
        clickHandler={skipForwardButtonClickHandler}
      />
    </div>
  );
};

export default TimerBottom;
