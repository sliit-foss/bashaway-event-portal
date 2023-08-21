import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { Button } from "@/components/common";
import { downloadFile } from "@/utils";

const ActionButtons = ({ question, className, buttonClassName }) => {
  const navigate = useNavigate();
  return (
    <div className={twMerge("flex flex-col md:flex-row gap-3 mt-1", className)}>
      <Button
        className={twMerge("py-2 md:py-1.5", buttonClassName)}
        disabled={false}
        onClick={() => {
          document.getElementById("file-upload").click();
        }}
      >
        <Plus strokeWidth="2.5" />
        Add Submission
      </Button>
      <Button
        variant="secondary"
        className={twMerge("bg-transparent", buttonClassName)}
        onClick={() => downloadFile(question.codebase_url)}
        disabled={!question}
      >
        Download codebase
      </Button>
      <Button
        variant="secondary"
        className={twMerge("bg-transparent", buttonClassName)}
        disabled={!question}
        onClick={() => navigate(`/questions/${question._id}/submissions`)}
      >
        View submissions
      </Button>
    </div>
  );
};

export default ActionButtons;
