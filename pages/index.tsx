import type { GetStaticProps, NextPage } from 'next';
import styles from '../styles/pages/Home.module.scss';
import { data } from "../consts/data";
import { IItem } from "../types";
import { ItemCard } from "../components/ItemCard";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { CartContext } from "../utils/CartContext";
import { useRouter } from "next/router";

type PropsType = {
  data: IItem[],
}

const Home: NextPage<PropsType> = ({ data }) => {
  const router = useRouter();

  const [cartItems, setCartItems] = useContext(CartContext);
  const [items, setItems] = useState<IItem[]>([]);

  const cartItemsCount = useMemo(
    () => cartItems.reduce((a: number, b: IItem) => a += b.count, 0)
    , [cartItems]);

  const initTelegramMainButton = useCallback(() => {
    const mainButton = window.Telegram.WebApp.MainButton;
    mainButton.onClick(() => {
      router.push('/cart');
    });
    mainButton.setParams({
      text: `Перейти в корзину (${cartItemsCount})`,
      color: '#f9a818',
      text_color: '#fff',
      is_active: cartItemsCount > 0,
      is_visible: true,
    });
  }, [cartItemsCount]);

  useEffect(() => {
    setItems(data.map(item => cartItems.find((cartItem: IItem) => cartItem.id === item.id) || item));
  }, []);

  useEffect(() => {
    initTelegramMainButton();
  }, [initTelegramMainButton]);

  const handleItemCountChange = (item: IItem, change: number) => {
    const itemIndex = items.findIndex((dataItem: IItem) => dataItem.id === item.id);
    setItems([
      ...items.slice(0, itemIndex),
      {
        ...item,
        count: item.count + change,
      },
      ...items.slice(itemIndex + 1)]
    );

    const cartItemIndex = cartItems.findIndex((cartItem: IItem) => cartItem.id === item.id);

    if (cartItemIndex !== -1) {
      if (item.count === 1 && change < 0) {
        setCartItems([
          ...cartItems.slice(0, cartItemIndex),
          ...cartItems.slice(cartItemIndex + 1)
        ]);
      } else {
        setCartItems([
          ...cartItems.slice(0, cartItemIndex),
          {
            ...item,
            count: item.count + change,
          },
          ...cartItems.slice(cartItemIndex + 1)
        ]);
      }
    } else {
      setCartItems([ ...cartItems, { ...item, count: 1 } ]);
    }
  };

  return (
    <div className={styles.itemsContainer}>
      {items.map(item => <ItemCard key={item.id} item={item} handleItemCountChange={handleItemCountChange} />)}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      data,
    },
  };
};

export default Home;
