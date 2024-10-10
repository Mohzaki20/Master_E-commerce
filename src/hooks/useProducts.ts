import { useAppDispatch, useAppSelector } from "@store/hooks";
import actGetProductsCatPrefix from "@store/products/act/actGetProductsCatPrefix";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { productsCleanUp } from "@store/products/productsSlice";
function useProducts() {
  const dispatch = useAppDispatch();
  const params = useParams();
  const { loading, error, records } = useAppSelector((state) => state.products);
  const cartItems = useAppSelector((state) => state.cart.items);
  const wishlistItemsId = useAppSelector((state) => state.wishlist.itemId);

  const productsFullInfo = records.map((el) => ({
    ...el,
    quantity: cartItems[el.id] || 0,
    isLiked: wishlistItemsId.includes(el.id),
  }));

  useEffect(() => {
    const promise = dispatch(actGetProductsCatPrefix(params.prefix as string));

    return () => {
      dispatch(productsCleanUp());
      promise.abort();
    };
  }, [dispatch, params]);
  return { productsFullInfo, loading, error, params };
}

export default useProducts;
