import { useAppDispatch } from 'hooks';

import { restartToSettings } from 'features/timer';

import { SvgButton } from 'components';
import { ReactComponent as SvgRestart } from 'assets/refresh-cw.svg';

export const TimerRestartButton = () => {
  const dispatch = useAppDispatch();

  const restartButtonClickHandler = () => {
    dispatch(restartToSettings());
  };

  return (
    <SvgButton svg={<SvgRestart />} clickHandler={restartButtonClickHandler} />
  );
};
