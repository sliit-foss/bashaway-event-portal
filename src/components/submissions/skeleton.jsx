import { Skeleton } from "@/components/common";
import { Actions } from "./actions";

const SubmissionListSkeleton = () => {
  return (
    <>
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton
          key={i}
          className="w-full flex flex-col md:flex-row items-center md:items-center justify-between gap-2 rounded-xl py-6 md:py-4 px-5"
          single
        >
          <div className="flex flex-col items-center md:items-start gap-2 md:gap-1">
            <Skeleton className="w-[240px] h-[1.27rem] sm:h-[1.35rem] md:h-[1.45rem] mb-[0.2rem]" shade="dark" single />
            <Skeleton className="w-28 h-[1.1rem] md:h-[1.25rem] mb-[0.2rem]" shade="dark" single />
          </div>
          <Actions className="z-50" buttonClassName="py-[9px] sm:py-2.5" />
        </Skeleton>
      ))}
    </>
  );
};

export default SubmissionListSkeleton;
