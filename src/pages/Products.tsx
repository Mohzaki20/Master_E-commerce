import { Container } from "react-bootstrap";
import Product from "@components/ecommerce/Product/Product";
import Loading from "@components/feedback/Loading";
import GridList from "@components/common/GridList/GridList";
import Heading from "@components/common/Heading/Heading";
import useProducts from "@hooks/useProducts";

const Products = () => {
  const { productsFullInfo, loading, error, params } = useProducts();
  return (
    <Container>
      <Heading title={`${params.prefix}  Products`} />
  <Loading status={loading} error={error} type="product">
        <GridList
        emptyMessage="No Products Found"
          records={productsFullInfo}
          renderItem={(record) => <Product {...record} />}
        />
      </Loading>
    </Container>
  );
};
export default Products;