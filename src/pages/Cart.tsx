import Heading from "@components/common/Heading/Heading";
import CartSubtotalPrice from "@components/ecommerce/CartSubTotal/CartSubTotal";
import Loading from "@components/feedback/Loading";
import CartItemList from "@components/ecommerce/CartItemList/CartItemList.tsx";
import useCart from "@hooks/useCart";

const Cart = () => {
  const { products, loading, error, changeQuantityHandler, removeItemHandler } =
    useCart();
  return (
    <>
      <Heading title={"Your Cart"} />
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
