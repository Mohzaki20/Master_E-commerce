import { Container } from "react-bootstrap";
import Product from "@components/ecommerce/Product/Product";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import actGetProductsCatPrefix from "@store/products/act/actGetProductsCatPrefix";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { productsCleanUp } from "@store/products/productsSlice";
import Loading from "@components/feedback/Loading";
import GridList from "@components/common/GridList/GridList";
import Heading from "@components/common/Heading/Heading";

const Products = () => {
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
    if (!records.length) {
      dispatch(actGetProductsCatPrefix(params.prefix as string));
    }
    return () => {
      dispatch(productsCleanUp());
    };
  }, [dispatch, params]);

  return (
    <Container>
      <Heading>
        <span className="text-capitalize me-2">{params.prefix}</span>Products
      </Heading>
      <Loading status={loading} error={error}>
        <GridList
          records={productsFullInfo}
          renderItem={(record) => <Product {...record} />}
        />
      </Loading>
    </Container>
  );
};
export default Products;
