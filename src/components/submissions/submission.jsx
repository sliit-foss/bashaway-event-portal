import { FileUp } from "lucide-react";
import { default as moment } from "moment-timezone";
import { BodyText3, Subtitle } from "@/components/common";
import { Actions } from "./actions";

const Submission = ({ submission }) => {
  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-between gap-2 bg-gray-50 border rounded-xl py-6 md:py-4 px-5 cursor-default">
      <div className="flex flex-col items-center md:items-start gap-2 md:gap-1">
        <div className="flex gap-2 items-center">
          <FileUp className="opacity-90" size={22} />
          <BodyText3 className="font-medium uppercase lg:text-[18px] text-black/90">
            {moment(submission.created_at).tz("Asia/Colombo").format("DD MMM YYYY hh:mm A")} IST{" "}
          </BodyText3>
        </div>
        <Subtitle className="font-medium text-black/40 mt-0.5">
          {submission?.score} PTS {submission.graded_by || submission.automatically_graded ? "(Graded)" : ""}{" "}
        </Subtitle>
      </div>
      <Actions submission={submission} buttonClassName="py-[5px] sm:py-1.5" />
    </div>
  );
};

export default Submission;
