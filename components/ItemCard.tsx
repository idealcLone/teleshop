import React, { useContext, useState } from "react";

import Image from 'next/image';

import { IItem } from "../types";

import styles from '../styles/components/ItemCard.module.scss';
import { ItemModal } from "./ItemModal";
import { CartContext } from "../utils/CartContext";

type PropsType = {
  item: IItem,
  handleItemCountChange: (item: IItem, change: number) => void,
}

export const ItemCard: React.FC<PropsType> = ({ item, handleItemCountChange }) => {
  const [openModal, setOpenModal] = useState(false);

  const handleClose = () => {
    setOpenModal(false);
  }

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleAdd = () => {
    handleItemCountChange(item, 1);
  };

  const handleRemove = () => {
    handleItemCountChange(item, -1);
  };

  return (
    <>
      <ItemModal item={item} open={openModal} handleClose={handleClose} />
      <div className={styles.itemCard}>
        <div className={styles.itemCardImageContainer} onClick={handleOpen}>
          <Image
            className={styles.itemCardImage}
            src={item.image}
            alt={item.name}
            layout="fill"
          />
        </div>
        {item.count > 0 && <div className={styles.itemCount}>{item.count}</div>}
        <div className={styles.itemCardTitle}>{item.name} ({item.packaging})</div>
        <div className={styles.itemCardPrice}>{item.price}₸</div>
        {
          item.count > 0 ? (
              <div className={styles.toggleCount}>
                <span onClick={handleRemove}>-</span>
                <span onClick={handleAdd}>+</span>
              </div>
            ) : <button className={styles.itemCardButton} onClick={handleAdd}>Добавить</button>
        }
      </div>
    </>
  );
}