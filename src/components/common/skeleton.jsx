import { default as SkeletonLoader } from "react-loading-skeleton";
import { twMerge } from "tailwind-merge";

const Skeleton = ({ containerClassName, className, ...props }) => {
  return (
    <SkeletonLoader
      containerClassName={twMerge("", containerClassName)}
      className={twMerge("h-full w-full rounded-md", className)}
      {...props}
    />
  );
};

export default Skeleton;
