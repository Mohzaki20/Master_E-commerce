import Heading from "@components/common/Heading/Heading";
import CartSubtotalPrice from "@components/ecommerce/CartSubTotal/CartSubTotal";
import Loading from "@components/feedback/Loading";
import CartItemList from "@components/ecommerce/CartItemList/CartItemList.tsx";
import useCart from "@hooks/useCart";
import LottieHandler from "@components/feedback/lottieHandler/LottieHandler";

const Cart = () => {
  const { products, loading, error, changeQuantityHandler, removeItemHandler } =
    useCart();
  return (
    <>
      <Heading title={"Your Cart"} />
      <Loading error={error} status={loading} type="cart">
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
      <LottieHandler type="empty" message="Your cart is empty"/>
        )}
      </Loading>
    </>
  );
};

export default Cart;
