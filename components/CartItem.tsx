import React from "react";
import { IItem } from "../types";

import Image from 'next/image';

import styles from '../styles/components/CartItem.module.scss';

type PropsType = {
  item: IItem,
}

export const CartItem: React.FC<PropsType> = ({ item }) => {
  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        <Image
          src={item.image}
          alt={item.name}
          layout="fill"
        />
      </div>
      <div className={styles.title}>
        <span>{item.name} × {item.count}</span>
        <span>{item.packaging}</span>
      </div>
      <div className={styles.price}>{item.price}₸</div>
    </div>
  )
};