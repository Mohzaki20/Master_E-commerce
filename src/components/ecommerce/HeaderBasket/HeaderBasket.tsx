import Logo from "../../../assets/svg/cart.svg?react";

import styles from "./style.module.css";
const { basketContainer, basketQuantity } = styles;

function HeaderBasket() {
  return (
    <div>
      <div className={basketContainer}>
        <Logo title="basket icon" />
        <div className={basketQuantity}>0</div>
      </div>
    </div>
  );
}

export default HeaderBasket;
