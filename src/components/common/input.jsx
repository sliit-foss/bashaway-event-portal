import { useState } from "react";
import { EyeIcon, EyeOff } from "lucide-react";
import { twMerge } from "tailwind-merge";

const eyeIconClasses = "cursor-pointer text-black/40 hover:text-black/60 transition-all duration-medium";

const Input = ({ ...props }) => {
  const [localType, setLocalType] = useState(props.type || "text");
  return (
    <div className={twMerge("w-full relative", props.wrapperclasses)}>
      <input
        {...props}
        className={twMerge(
          `w-full h-14 sm:h-16 bg-transparent border-2 bg-white border-black/40 focus:border-black outline-none !focus:outline-none !ring-0 !focus:ring-0 rounded-md text-black p-4 text-base font-normal transition duration-300`,
          props.className
        )}
        type={localType}
      />
      {props.type === "password" && (
        <div
          className={`w-fit h-full absolute right-3 top-0 flex justify-center items-center ${
            props.className.includes("hidden") || props.className.includes("opacity-0") ? "hidden opacity-0" : ""
          }`}
        >
          {localType === "password" ? (
            <EyeIcon className={eyeIconClasses} onClick={() => setLocalType("text")} />
          ) : (
            <EyeOff className={eyeIconClasses} onClick={() => setLocalType("password")} />
          )}
        </div>
      )}
    </div>
  );
};

export default Input;
