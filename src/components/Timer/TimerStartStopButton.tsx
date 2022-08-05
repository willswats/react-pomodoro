import { Dispatch } from 'react';
import { State, Action, ACTIONS } from './Timer';

import StartStopButton from '../UI/Buttons/StartStopButton';

interface TimerStartStopButtonProps {
  state: State;
  dispatch: Dispatch<Action>;
}

const TimerStartStopButton = ({
  state,
  dispatch,
}: TimerStartStopButtonProps) => {
  const { timerRunning } = state;

  const startStopButtonClickHandler = () => {
    dispatch({
      type: ACTIONS.SET_TIMER_RUNNING,
      payload: { ...state, timerRunning: !timerRunning },
    });
  };

  return (
    <StartStopButton
      timerRunning={timerRunning}
      clickHandler={startStopButtonClickHandler}
    />
  );
};

export default TimerStartStopButton;
