import { twMerge } from "tailwind-merge";
import { Skeleton } from "@/components/common";

const containerStyles = "flex flex-col p-5 gap-6 rounded-2xl";

const QuestionGridSkeleton = ({ className }) => {
  return (
    <div className={className}>
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="group h-full w-full animated-border text-border from-black/20 to-border p-5 rounded-3xl"
        >
          <Skeleton containerClassName="flex" className={twMerge(containerStyles, "py-6")}>
            <Skeleton className="w-3/4 md:w-1/2 h-[1.5rem]" shade="dark" />
            <Skeleton className="w-full h-[1.1rem] my-[0.11rem]" count={3} shade="dark" />
            <div className="flex flex-wrap gap-3 [&>span]:border-2 [&>span]:border-black/10 [&>span]:px-3 [&>span]:py-2 [&>span]:rounded-lg z-50">
              <Skeleton className="w-[2.1rem] h-6 rounded-sm" shade="dark" />
              <Skeleton className="w-[2.1rem] h-6 rounded-sm" shade="dark" />
              <Skeleton className="w-[2.1rem] h-6 rounded-sm" shade="dark" />
            </div>
          </Skeleton>
        </div>
      ))}
    </div>
  );
};

export default QuestionGridSkeleton;
