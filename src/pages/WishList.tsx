import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";

import GridList from "@components/common/GridList/GridList";
import Product from "@components/ecommerce/Product/Product";
import Loading from "@components/feedback/Loading";
import { TProduct } from "@customTypes/product";
import actGetWishlist from "@store/wishList/act/actGetWishlist";
import Heading from "@components/common/Heading/Heading";
import { productsfullInfoCleanUp } from "@store/wishList/wishlistSlice";

const Wishlist = () => {
  const dispatch = useAppDispatch();
  const { loading, error, productsFullInfo } = useAppSelector(
    (state) => state.wishlist
  );
  const cartItems = useAppSelector((state) => state.cart.items);

  useEffect(() => {
    dispatch(actGetWishlist());
    return () => {
      productsfullInfoCleanUp();
    };
  }, [dispatch]);

  const records = productsFullInfo.map((el) => ({
    ...el,
    quantity: cartItems[el.id],
    isLiked: true,
  }));

  return (
    <>
      <Heading>Your Wishlist</Heading>
      <Loading status={loading} error={error}>
        <GridList<TProduct>
          records={records}
          renderItem={(record) => <Product {...record} />}
        />
      </Loading>
    </>
  );
};

export default Wishlist;
