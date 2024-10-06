import WishList from "@assets/svg/wishlist.svg?react";

import styles from "./style.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@store/hooks";
const { container, totalNum, pumpAnimate, iconWrapper } = styles;

function HeaderWishList() {
  const [isAnimate, setIsAnimate] = useState(false);
  const totalQuantity = useAppSelector((state) => state.wishlist.itemId);
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
    <div className={container} onClick={() => navigate("/wishlist")}>
      <div className={iconWrapper}>
        <WishList />
        {totalQuantity.length === 0 ? (
          ""
        ) : (
          <div className={quantityStyle}>{totalQuantity.length}</div>
        )}
      </div>
      <h3>WishList</h3>
    </div>
  );
}

export default HeaderWishList;
