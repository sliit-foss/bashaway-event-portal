import { twMerge } from "tailwind-merge";

const BodyText3 = ({ children, className, ...props }) => {
  return (
    <span
      className={twMerge("text-[16px] sm:text-[18px] lg:text-[20px] text-center lg:text-start", className)}
      {...props}
    >
      {children}
    </span>
  );
};

export default BodyText3;
