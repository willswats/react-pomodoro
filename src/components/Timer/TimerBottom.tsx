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

  const skipBackButtonClickHandler = () => {};

  const skipForwardButtonClickHandler = () => {};

  return (
    <div className={classes['timer-bottom']}>
      <SvgButton
        svg={<SvgSkipBack />}
        extraClassNames={classes['timer-bottom__svg-button-skip-back']}
        clickHandler={skipBackButtonClickHandler}
      />
      {timerRunning === false ? (
        <SvgButton svg={<SvgPlay />} clickHandler={startButtonClickHandler} />
      ) : (
        <SvgButton svg={<SvgPause />} clickHandler={stopButtonClickHandler} />
      )}
      <SvgButton
        svg={<SvgSkipForward />}
        extraClassNames={classes['timer-bottom__svg-button-skip-forward']}
        clickHandler={skipForwardButtonClickHandler}
      />
    </div>
  );
};

export default TimerBottom;
