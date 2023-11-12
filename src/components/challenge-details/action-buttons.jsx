import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { downloadFile } from "@/utils";
import { AnimatedSwitcher, Button } from "@sliit-foss/bashaway-ui/components";

const ActionButtons = ({ loading = false, challenge, className, buttonClassName }) => {
  const navigate = useNavigate();
  return (
    <div className={twMerge("flex flex-col md:flex-row gap-3 mt-1", className)}>
      <Button
        className={twMerge("py-2 md:py-1.5", buttonClassName)}
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
        onClick={() => downloadFile(challenge.codebase_url)}
        disabled={!challenge}
      >
        Download codebase
      </Button>
      <Button
        variant="secondary"
        className={twMerge("bg-transparent", buttonClassName)}
        disabled={!challenge}
        onClick={() => navigate(`/challenges/${challenge._id}/submissions`)}
      >
        View submissions
      </Button>
    </div>
  );
};

export default ActionButtons;
