import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import actGetWishlist from "@store/wishList/act/actGetWishlist";
import { productsfullInfoCleanUp } from "@store/wishList/wishlistSlice";

function useWishList() {
  const dispatch = useAppDispatch();
  const { loading, error, productsFullInfo } = useAppSelector(
    (state) => state.wishlist
  );
  const cartItems = useAppSelector((state) => state.cart.items);

  useEffect(() => {
    const promise = dispatch(actGetWishlist());
    return () => {
      productsfullInfoCleanUp();
      promise.abort();
    };
  }, [dispatch]);

  const records = productsFullInfo.map((el) => ({
    ...el,
    quantity: cartItems[el.id],
    isLiked: true,
  }));
  return { loading, error, records };
}

export default useWishList;
