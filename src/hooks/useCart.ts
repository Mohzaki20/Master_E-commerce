import actGetProductsByItems from "@store/cart/act/actGetProductsByItems";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useCallback, useEffect } from "react";
import {
  cartItemChangeQuantity,
  cartItemsCleanUp,
  removeItem,
} from "@store/cart/cartSlice";
function useCart() {
  const dispatch = useAppDispatch();
  const { items, productsFullInfo, loading, error } = useAppSelector(
    (state) => state.cart
  );

  useEffect(() => {
    const promise = dispatch(actGetProductsByItems());
    return () => {
      cartItemsCleanUp();
      promise.then();
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
  return { products, loading, error, changeQuantityHandler, removeItemHandler };
}

export default useCart;
