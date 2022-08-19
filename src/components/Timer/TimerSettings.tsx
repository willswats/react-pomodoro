import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setSettingsVisible } from '../../store/timerSlice';

import ModalOverlay from '../UI/ModalOverlay';
import TimerSettingsForm from './TimerSettingsForm';
import TimerSettingsButton from './Buttons/TimerSettingsButton';

const TimerSettings = () => {
  const dispatch = useAppDispatch();
  const timer = useAppSelector((state) => state.timer);

  const modalOverlayClickHandler = () => {
    dispatch(setSettingsVisible(false));
  };

  return (
    <>
      <TimerSettingsButton />
      {timer.settingsVisible && (
        <ModalOverlay
          modal={<TimerSettingsForm />}
          clickHandler={modalOverlayClickHandler}
        />
      )}
    </>
  );
};

export default TimerSettings;
