import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { useGetSettingsQuery } from "@/store/api";
import { downloadFile } from "@/utils";
import { AnimatedSwitcher, Button } from "@sliit-foss/bashaway-ui/components";

const ActionButtons = ({ loading = false, question, className, buttonClassName }) => {
  const { data: { data: settings } = {}, isLoading } = useGetSettingsQuery();

  const navigate = useNavigate();
  return (
    <div className={twMerge("flex flex-col md:flex-row gap-3 mt-1", className)}>
      <Button
        className={twMerge("py-2 md:py-1.5", buttonClassName)}
        disabled={isLoading || new Date(settings?.submission_deadline) < new Date()}
        loading={loading}
        onClick={() => document.getElementById("file-upload").click()}
      >
        <AnimatedSwitcher
          show={!loading}
          className="w-auto h-auto"
          component={<Plus strokeWidth="2.5" />}
          alternateComponent={null}
        />
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
