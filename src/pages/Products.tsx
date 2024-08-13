import { Container, Row, Col } from "react-bootstrap";
import Product from "@components/ecommerce/Product/Product";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import actGetProductsCatPrefix from "@store/categories copy/act/actGetProductsCatPrefix";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { productsCleanUp } from "@store/categories copy/productsSlice";

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

  const productList =
    records.length > 0
      ? records.map((record) => (
          <Col
            xs={6}
            md={3}
            className="d-flex justify-content-center mb-5 mt-2"
          >
            <Product {...record} />
          </Col>
        ))
      : "There are no categories";
  return (
    <Container>
      <Row>{productList}</Row>
    </Container>
  );
};
export default Products;
