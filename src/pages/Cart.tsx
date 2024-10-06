import Heading from "@components/common/Heading/Heading";
import CartSubtotalPrice from "@components/ecommerce/CartSubTotal/CartSubTotal";
import Loading from "@components/feedback/Loading";
import actGetProductsByItems from "@store/cart/act/actGetProductsByItems";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useCallback, useEffect } from "react";
import CartItemList from "@components/ecommerce/CartItemList/CartItemList.tsx";
import {
  cartItemChangeQuantity,
  cartItemsCleanUp,
  removeItem,
} from "@store/cart/cartSlice";

const Cart = () => {
  const dispatch = useAppDispatch();
  const { items, productsFullInfo, loading, error } = useAppSelector(
    (state) => state.cart
  );

  useEffect(() => {
    dispatch(actGetProductsByItems());
    return () => {
      cartItemsCleanUp();
    };
  }, [dispatch]);

  const products = productsFullInfo.map((el) => ({
    ...el,
    quantity: items[el.id],
  }));
  const changeQuantityHandler = useCallback(
    (id: number, quantity: number) => {
      dispatch(cartItemChangeQuantity({ id, quantity }));
    },
    [dispatch]
  );
  const removeItemHandler = useCallback(
    (id: number) => {
      dispatch(removeItem(id));
    },
    [dispatch]
  );
  return (
    <>
      <Heading>Your Cart</Heading>
      <Loading error={error} status={loading}>
        {products.length ? (
          <>
            <CartItemList
              products={products}
              changeQuantityHandler={changeQuantityHandler}
              removeItemHandler={removeItemHandler}
            />
            <CartSubtotalPrice products={products} />
          </>
        ) : (
          "Your Cart is Empty"
        )}
      </Loading>
    </>
  );
};

export default Cart;
