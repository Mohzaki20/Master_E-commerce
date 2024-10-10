import GridList from "@components/common/GridList/GridList";
import Product from "@components/ecommerce/Product/Product";
import Loading from "@components/feedback/Loading";
import { TProduct } from "@customTypes/product.types";
import Heading from "@components/common/Heading/Heading";
import useWishList from "@hooks/useWishList";

const Wishlist = () => {
  const { loading, error, records } = useWishList();
  return (
    <>
      <Heading title={"Your Wishlist"} />
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
