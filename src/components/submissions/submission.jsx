import { FileUp } from "lucide-react";
import { default as moment } from "moment-timezone";
import { twMerge } from "tailwind-merge";
import { BodyText3, Subtitle } from "@/components/common";
import { Actions } from "./actions";

const Submission = ({ submission, highlight = false, ...props }) => {
  return (
    <div
      className={twMerge(
        "group w-full flex flex-col md:flex-row items-center justify-between gap-2 border",
        "rounded-xl py-6 md:py-4 px-5 cursor-default transition-all duration-medium",
        highlight
          ? "bg-red-50/90 border-transparent"
          : "bg-gray-50 hover:bg-red-50/90 border-black/[0.05] hover:border-transparent"
      )}
      {...props}
    >
      <div className="flex flex-col items-center md:items-start gap-2 md:gap-1">
        <div className="flex gap-2 items-center">
          <FileUp
            className={twMerge("opacity-90", highlight ? "card-red-title" : "group-hover:card-red-title")}
            size={22}
          />
          <BodyText3
            className={twMerge(
              "font-medium uppercase lg:text-[18px] text-black/90",
              highlight ? "card-red-title" : "group-hover:card-red-title"
            )}
          >
            {moment(submission.created_at).tz("Asia/Colombo").format("DD MMM YYYY hh:mm A")} IST{" "}
          </BodyText3>
        </div>
        <Subtitle
          className={twMerge(
            "font-medium text-black/40 mt-0.5 transition-all duration-medium",
            highlight ? "card-red-body" : "group-hover:card-red-body"
          )}
        >
          {submission?.score} PTS {submission.graded_by || submission.automatically_graded ? "(Graded)" : ""}{" "}
        </Subtitle>
      </div>
      <Actions submission={submission} buttonClassName="py-[5px] sm:py-1.5" />
    </div>
  );
};

export default Submission;
