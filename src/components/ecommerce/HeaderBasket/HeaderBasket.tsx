import { useAppSelector } from "@store/hooks";
import Logo from "../../../assets/svg/cart.svg?react";

import styles from "./style.module.css";
import { getCartTotalQuantity } from "@store/cart/selectors";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const { container, totalNum, pumpAnimate, iconWrapper } = styles;

function HeaderBasket() {
  const [isAnimate, setIsAnimate] = useState(false);
  const totalQuantity = useAppSelector(getCartTotalQuantity);
  const navigate = useNavigate();
  const quantityStyle = `${totalNum} ${isAnimate ? pumpAnimate : ""}`;
  useEffect(() => {
    if (!totalQuantity) {
      return;
    }
    setIsAnimate(true);
    const debounce = setTimeout(() => {
      setIsAnimate(false);
    }, 300);
    return () => clearTimeout(debounce);
  }, [totalQuantity]);
  return (
    <div className={container} onClick={() => navigate("/cart")}>
      <div className={iconWrapper}>
        <Logo title="basket icon" />
        {totalQuantity === 0 ? (
          ""
        ) : (
          <div className={quantityStyle}>{totalQuantity}</div>
        )}{" "}
      </div>
      <h3>Cart</h3>
    </div>
  );
}

export default HeaderBasket;
