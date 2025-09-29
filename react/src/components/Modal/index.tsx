import { createPortal } from 'react-dom';
import styles from '@/styles/modal.module.css';
import { useEffect } from 'react';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ open, onClose, children }) => {
  // to open modal only in browser
  const modalRoot = window ? document.getElementById('modal-root') : null;

  useEffect(() => {
    // close the modal on pressing ESC key
    const handleEscapeClick = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscapeClick);

    // disable scrolling of the content in the background
    const prevOverflowStyle = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscapeClick);
      document.body.style.overflow = prevOverflowStyle;
    };
  }, [onClose]);

  return modalRoot && open
    ? createPortal(
        <div role='presentation' className={styles.backdrop} onClick={onClose}>
          <div
            role='dialog'
            aria-modal='true'
            aria-label='App modal'
            className={styles.modal}
            onClick={e => e.stopPropagation()}
          >
            <button className={styles.close} onClick={onClose}>
              X
            </button>
            {children}
          </div>
        </div>,
        modalRoot
      )
    : null;
};

export default Modal;
