import { createPortal } from 'react-dom';

import classes from './ModalOverlay.module.css';

interface SettingsOverlayProps {
  modal: JSX.Element;
  clickHandler: () => void;
}

const modalRoot = document.getElementById('modal-root') as HTMLElement;

const ModalOverlay = ({ modal, clickHandler }: SettingsOverlayProps) => {
  return createPortal(
    <>
      <div onClick={clickHandler} className={classes['modal-overlay']} />
      <div className={classes['modal-container']}>{modal}</div>
    </>,
    modalRoot
  );
};

export default ModalOverlay;
