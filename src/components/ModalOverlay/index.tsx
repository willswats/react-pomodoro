import { createPortal } from 'react-dom';

import styles from './styles.module.css';

interface ModalOverlayProps {
  modal: JSX.Element;
  clickHandler: () => void;
}

const modalRoot = document.getElementById('modal-root') as HTMLElement;

export const ModalOverlay = ({ modal, clickHandler }: ModalOverlayProps) => {
  return createPortal(
    <>
      <div onClick={clickHandler} className={styles['modal-overlay']} />
      <div className={styles['modal-container']}>{modal}</div>
    </>,
    modalRoot
  );
};
