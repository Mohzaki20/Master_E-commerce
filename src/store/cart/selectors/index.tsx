import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../index";

const getCartTotalQuantity = createSelector(
  (state: RootState) => state.cart.items,
  (items) => {
    const totalQuantity = Object.values(items).reduce(
      (acc, current) => acc + current,
      0
    );
    return totalQuantity;
  }
);

export { getCartTotalQuantity };
