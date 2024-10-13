import { TLoading } from "@customTypes/shared.types";
import CategorySkeleton from "./skeletons/CategorySkeleton/CategorySkeleton";
import CartSkeleton from "./skeletons/CartSkeleton/CartSkeleton";
import ProductSkeleton from "./skeletons/ProductSkeleton.tsx/ProductSkeleton";
import LottieHandler from "./lottieHandler/LottieHandler";

const skeletonTypes = {
  cart: CartSkeleton,
  category: CategorySkeleton,
  product: ProductSkeleton,
};
type LoadingProps = {
  status: TLoading;
  error: string | null;
  children: React.ReactNode;
  type?: keyof typeof skeletonTypes;
};
function Loading({ children, status, error, type = "category" }: LoadingProps) {
  const Component = skeletonTypes[type];
  if (status === "pending") {
    return <Component />;
  }
  if (status === "failed") {
    return (
      <div>
        <LottieHandler type="error" message={error as string} />
      </div>
    );
  }

  return <>{children}</>;
}

export default Loading;
