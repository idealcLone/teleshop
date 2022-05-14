import React from "react";

import Image from 'next/image';

import { IItem } from "../types";
import { Modal } from "./Modal";
import styles from '../styles/components/ItemModal.module.scss';

type PropsType = {
  open: boolean,
  handleClose: () => void,
  item: IItem,
}

export const ItemModal: React.FC<PropsType> = ({ open, handleClose, item }) => {
  return (
    <Modal open={open} handleClose={handleClose}>
      <div className={styles.modalContainer}>
        <div className={styles.imageWrapper}>
          <Image
            src={item.image}
            alt={item.name}
            layout="fill"
          />
        </div>
        <div className={styles.title}>{item.fullName}</div>
        <div className={styles.packaging}>Фасовка: {item.packaging}</div>
        <div className={styles.capacity}>Количество в упаковке: {item.capacity}шт.</div>
      </div>
    </Modal>
  );
};