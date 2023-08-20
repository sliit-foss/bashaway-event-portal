import { CheckCircle2 } from "lucide-react";
import { isEmpty } from "lodash";
import { twMerge } from "tailwind-merge";
import { Badge, Skeleton } from "@/components/common";

const SubmissionCount = ({ question, className }) => {
  return (
    <Badge className={twMerge("normal-case border flex justify-center self-start items-center gap-1.5", className)}>
      {!isEmpty(question) ? question?.total_submissions : <Skeleton className="w-1.5 h-2" shade="dark" />}{" "}
      {question?.total_submissions === 1 ? "team " : "teams "}
      submitted
      <CheckCircle2 size={16} />
    </Badge>
  );
};

export default SubmissionCount;
