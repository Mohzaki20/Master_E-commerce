import { useAppSelector } from "@store/hooks";
import Logo from "../../../assets/svg/cart.svg?react";

import styles from "./style.module.css";
import { getCartTotalQuantity } from '@store/cart/selectors';
const { basketContainer, basketQuantity } = styles;

function HeaderBasket() {
  const cartItems = useAppSelector(getCartTotalQuantity);

  return (
    <div>
      <div className={basketContainer}>
        <Logo title="basket icon" />
        <div className={basketQuantity}>{cartItems}</div>
      </div>
    </div>
  );
}

export default HeaderBasket;
