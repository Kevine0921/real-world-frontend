import { FC, PropsWithChildren } from "react";
import PacmanLoader from "react-spinners/PacmanLoader";

const LoadingContainer: FC<
  PropsWithChildren<{ isLoading?: boolean; className?: string }>
> = ({ isLoading = false, className = "", children }) => {
  return (
    <div className={`relative ${className}`}>
      {isLoading ? (
        <div className="absolute w-full h-full grid place-content-center bg-slate-black bg-opacity-60 backdrop-blur-sm">
          <PacmanLoader color={"#013A6FFF"} />
        </div>
      ) : null}
      {children}
    </div>
  );
};

export default LoadingContainer;
