import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useEffect } from "react";
import { cleanUpCategory } from "@store/categories/categoriesSlice";
import actGetCategories from "@store/categories/act/actGetCategories";

function useCategories() {
  const dispatch = useAppDispatch();
  const { loading, error, records } = useAppSelector(
    (state) => state.categories
  );

  useEffect(() => {
    const promise = dispatch(actGetCategories());

    return () => {
      dispatch(cleanUpCategory());
      promise.abort();
    };
  }, [dispatch]);
  return { loading, error, records };
}

export default useCategories;
