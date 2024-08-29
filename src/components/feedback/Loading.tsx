import { TLoading } from "@customTypes/shared";

type LoadingProps = {
  status: TLoading;
  error: string | null;
  children: React.ReactNode;
};
function Loading({ children, status, error }: LoadingProps) {
  if (status === "pending") {
    return "Loading Please wait...";
  }
  if (status === "failed") {
    return <p>{error}</p>;
  }

  return <>{children}</>;
}

export default Loading;
