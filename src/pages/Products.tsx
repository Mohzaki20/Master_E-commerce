import { Container } from "react-bootstrap";
import Product from "@components/ecommerce/Product/Product";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import actGetProductsCatPrefix from "@store/products/act/actGetProductsCatPrefix";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { productsCleanUp } from "@store/products/productsSlice";
import Loading from "@components/feedback/Loading";
import GridList from "@components/common/GridList/GridList";

const Products = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const { loading, error, records } = useAppSelector((state) => state.products);

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
      <Loading status={loading} error={error}>
      <GridList
          records={records}
          renderItem={(record) => <Product {...record} />}
        />
      </Loading>
    </Container>
  );
};
export default Products;
