import styles from "./style.module.css";
import HeaderCounter from "../HeaderCounter/HeaderCounter";
import { useAppSelector } from "@store/hooks";
import CartIcon from "@assets/svg/cart.svg?react";
import WishlistIcon from "@assets/svg/wishlist.svg?react";
import { getCartTotalQuantity } from "@store/cart/selectors";

const { headerLeftBar } = styles;

function HeaderLeftBar() {
  const wishlistTotalQuantity = useAppSelector(
    (state) => state.wishlist.itemId.length
  );
  const cartTotalQuantity = useAppSelector((state) =>
    getCartTotalQuantity(state)
  );
  return (
    <div className={headerLeftBar}>
      <HeaderCounter
        to="wishlist"
        title="WishList"
        totalQuantity={wishlistTotalQuantity}
        svgIcon={<WishlistIcon title="wishlist" />}
      />
      <HeaderCounter
        to="cart"
        title="Cart"
        totalQuantity={cartTotalQuantity}
        svgIcon={<CartIcon title="cart" />}
      />
    </div>
  );
}

export default HeaderLeftBar;
