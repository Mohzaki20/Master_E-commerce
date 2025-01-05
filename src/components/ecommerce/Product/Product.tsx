import { Button, Modal, Spinner } from "react-bootstrap";
import styles from "./style.module.css";
import { TProduct } from "@customTypes/product.types";
import { useAppDispatch } from "@store/hooks";
import { addToCart } from "@store/cart/cartSlice";
import { useEffect, useState, memo } from "react";
import Like from "@assets/svg/like.svg?react";
import LikeFill from "@assets/svg/like-fill.svg?react";
import actLikeToggle from "@store/wishList/act/actLikeToggle";
const { product, productImg, maximumNotice, wishlistBtn } = styles;

const Product = memo(
  ({
    title,
    img,
    price,
    id,
    max,
    quantity,
    isLiked,
    isAuthenticated,
  }: TProduct) => {
    const dispatch = useAppDispatch();
    const [isBtnDisabled, setIsBtnDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const currentRemainingQuantity = max - (quantity ?? 0);
    const quantityReachedToMax = currentRemainingQuantity <= 0 ? true : false;

    useEffect(() => {
      if (!isBtnDisabled) {
        return;
      }
      setIsBtnDisabled(true);
      const debounce = setTimeout(() => {
        setIsBtnDisabled(false);
      }, 300);
      return () => clearTimeout(debounce);
    }, [isBtnDisabled]);

    const addToCartHandler = () => {
      dispatch(addToCart(id));
      setIsBtnDisabled(true);
    };
    const LikeToggleHandler = () => {
      if (isAuthenticated) {
        if (!isLoading) setIsLoading(true);
        dispatch(actLikeToggle(id))
          .unwrap()
          .then(() => setIsLoading(false))
          .catch(() => setIsLoading(false));
      } else {
        setShowModal(true);
      }
    };
    return (
      <>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Login Required</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            You need to login first to add this item to your wishlist.
          </Modal.Body>
        </Modal>

        <div className={product}>
          <div className={wishlistBtn} onClick={LikeToggleHandler}>
            {isLoading ? (
              <Spinner animation="border" size="sm" />
            ) : isLiked ? (
              <LikeFill />
            ) : (
              <Like />
            )}
          </div>
          <div className={productImg}>
            <img src={img} alt={title} />
          </div>
          <h2>{title}</h2>
          <h3>{price.toFixed(2)} EGP</h3>
          <p className={maximumNotice}>
            {quantityReachedToMax
              ? `You reached to the limit`
              : `You can add ${currentRemainingQuantity} item(s)`}
          </p>
          <Button
            variant="info"
            style={{ color: "white" }}
            onClick={addToCartHandler}
            disabled={isBtnDisabled || quantityReachedToMax}
          >
            {isBtnDisabled ? (
              <>
                <Spinner animation="border" size="sm" />
                Loading...
              </>
            ) : (
              "Add to cart"
            )}
          </Button>
        </div>
      </>
    );
  }
);

export default Product;
