import { NextPage } from "next";

import styles from '../../styles/pages/Cart.module.scss';
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { data } from "../../consts/data";
import { IItem } from "../../types";
import { CartItem } from "../../components/CartItem";
import { CartContext } from "../../utils/CartContext";
import Link from "next/link";
import { useRouter } from "next/router";
import { Modal } from "../../components/Modal";

const Cart: NextPage = () => {
  const router = useRouter();

  const [cartItems, setCartItems] = useContext(CartContext);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const totalPrice = useMemo(
    () => cartItems.reduce((a: number, b: IItem) => a += b.count * b.price, 0)
    , [cartItems]);

  const initTelegramMainButton = useCallback(() => {
    const mainButton = window.Telegram.WebApp.MainButton;
    mainButton.onClick(() => {
      handleModalOpen();
    });
    mainButton.setParams({
      text: `Отправить заявку на стоимость ${totalPrice}`,
      color: '#f9a818',
      text_color: '#fff',
      is_active: true,
      is_visible: true,
    });
  }, [totalPrice]);

  useEffect(() => {
    initTelegramMainButton();
  }, [initTelegramMainButton]);

  const handleModalClose = () => {
    setModalOpen(false);
    setCartItems([]);
    router.push('/');
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  return (
    <>
      <Modal open={modalOpen} handleClose={handleModalClose}>
        <div className={styles.orderSuccess}>
          Ваша заявка успешно отправлена
        </div>
      </Modal>
      <div className={styles.container}>
        <div className={styles.ordersContainer}>
          <div className={styles.title}>
            <span>Ваш заказ</span>
            <span>
              <Link href="/">Редактировать</Link>
            </span>
          </div>
          <div className={styles.ordersList}>
            {cartItems.map((cartItem: IItem) => <CartItem key={cartItem.id} item={cartItem} />)}
          </div>
          <div className={styles.total}>
            <span>Итого:</span>
            <span>{totalPrice}₸</span>
          </div>
        </div>
        <div className={styles.commentContainer}>
          <input type="text" className={styles.commentInput} placeholder="Добавить комментарий..."/>
          <div className={styles.commentTip}>
            Особые требования, детали, пожелания и тд.
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;