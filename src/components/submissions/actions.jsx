import { twMerge } from "tailwind-merge";
import { scorekeeperRepositoryLink } from "@/constants";
import { Button } from "@sliit-foss/bashaway-ui/components";

export const Actions = ({ submission, className, buttonClassName }) => (
  <div className={twMerge("w-full md:w-auto flex flex-col md:flex-row justify-end gap-3 mt-1", className)}>
    <a
      href={`${scorekeeperRepositoryLink}/actions?query=workflow%3A+${submission?._id}`}
      target="_blank"
      className={!submission ? "pointer-events-none" : ""}
      rel="noreferrer"
    >
      <Button className={twMerge("w-full md:w-auto self-start md:self-center", buttonClassName)} disabled={!submission}>
        View Results
      </Button>
    </a>
  </div>
);

export default Actions;
