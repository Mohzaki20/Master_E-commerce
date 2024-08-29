import { Button } from "react-bootstrap";
import styles from "./style.module.css";
import { TProduct } from "@customTypes/product";
import { useAppDispatch } from "@store/hooks";
import { addCart } from "@store/cart/cartSlice";

const { product, productImg } = styles;

const Product = ({ title, img, price, id }: TProduct) => {
  const dispatch = useAppDispatch();
  const addToCartHandler = () => {
    dispatch(addCart(id));
  };
  return (
    <div className={product}>
      <div className={productImg}>
        <img src={img} alt={title} />
      </div>
      <h2>{title}</h2>
      <h3>{price} EGP</h3>
      <Button
        variant="info"
        style={{ color: "white" }}
        onClick={addToCartHandler}
      >
        Add to cart
      </Button>
    </div>
  );
};

export default Product;
