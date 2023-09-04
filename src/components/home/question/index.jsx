import { useMemo } from "react";
import { useCallback } from "react";
import { default as ReactMarkdown } from "react-markdown";
import { MotionScene, SharedElement, useMotion } from "react-motion-layout";
import { useNavigate } from "react-router-dom";
import { startCase } from "lodash";
import { twMerge } from "tailwind-merge";
import { challengeColor } from "@/utils";
import { Body3, Footnote } from "@sliit-foss/bashaway-ui/typography";

export { default as QuestionGridSkeleton } from "./skeleton";

export const Question = ({ question }) => {
  const navigate = useNavigate();
  const withTransition = useMotion(`question-${question._id}`);
  const callback = useCallback(() => navigate(`/questions/${question._id}`));

  const cardStyles = useMemo(() => challengeColor(question), [question]);

  const cleanedDescription = useMemo(() => {
    if (question.description) {
      return question.description
        .replace(/^#+\s.*$/gm, "")
        .trim()
        .split("\n")[0];
    }
    return "";
  }, [question.description]);

  return (
    <MotionScene name={`question-${question._id}`} onClick={withTransition(callback)}>
      <div className="group h-full w-full animated-border text-border from-black/20 to-border p-5 rounded-3xl">
        <div
          className={twMerge(
            "w-full h-full flex flex-col p-5 gap-6 rounded-2xl transition-all duration-medium",
            cardStyles
          )}
        >
          <SharedElement.Text animationKey={`question-title-${question._id}`}>
            <Body3 className="font-bold transition-all duration-medium">{question.name}</Body3>
          </SharedElement.Text>
          <ReactMarkdown className="markdown [&>p]:font-semibold line-clamp-3">{cleanedDescription}</ReactMarkdown>
          <div className="flex flex-wrap gap-3 [&>span]:px-3 [&>span]:py-2 [&>span]:rounded-lg [&>span]:transition-all [&>span]:duration-medium">
            <Footnote>{startCase(question.difficulty.toLowerCase())}</Footnote>
            <Footnote>{question.max_score}PT</Footnote>
            {question.constraints?.length && <Footnote>{question.constraints?.join(", ")}</Footnote>}
          </div>
        </div>
      </div>
    </MotionScene>
  );
};

export default Question;
