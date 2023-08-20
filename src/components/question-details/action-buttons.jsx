import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { Button } from "@/components/common";
import { downloadFile } from "@/utils";

const ActionButtons = ({ question, className, buttonClassName }) => {
  const navigate = useNavigate();
  return (
    <div className={twMerge("flex flex-col sm:flex-row gap-3 mt-1", className)}>
      <Button className={buttonClassName} onClick={() => downloadFile(question.codebase_url)} disabled={!question}>
        Download codebase
      </Button>
      <Button
        className={buttonClassName}
        disabled={!question}
        onClick={() => navigate(`/questions/${question._id}/submissions`)}
      >
        View submissions
      </Button>
    </div>
  );
};

export default ActionButtons;
