import React from "react";

import styles from '../styles/components/Modal.module.scss';

type PropsType = {
  open: boolean,
  handleClose: () => void,
  children: React.ReactNode,
}

export const Modal: React.FC<PropsType> = ({ open, handleClose, children }) => {
  return open ? (
      <div className={styles.modal}>
        <div className={styles.modalBackdrop} onClick={handleClose} />
        <div className={styles.modalBody}>{children}</div>
      </div>
    ) : <></>;
};