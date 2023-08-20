import { useMemo } from "react";
import { Plus } from "lucide-react";
import { default as ReactMarkdown } from "react-markdown";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createSelector } from "@reduxjs/toolkit";
import { isEmpty, startCase } from "lodash";
import { twMerge } from "tailwind-merge";
import { AnimatedSwitcher, BreadCrumbs, Button, Skeleton, Subheadline, Subtitle, toast } from "@/components/common";
import { ActionButtons, SubmissionCount } from "@/components/question-details";
import { useEffectOnce, useTitle } from "@/hooks";
import { uploadFile } from "@/services";
import { useAddSubmissionMutation, useGetQuestionByIdQuery } from "@/store/api";
import { challengeColor } from "@/utils";

export default function QuestionDetails() {
  const { id } = useParams();

  const questionFromStore = useSelector(
    createSelector(
      (store) => store.questionApi.queries,
      (queries) =>
        Object.values(queries)
          ?.sort((a, b) => b?.fulfilledTimeStamp - a.fulfilledTimeStamp)?.[0]
          ?.data?.data?.docs?.filter((q) => q?._id === id)?.[0]
    )
  );

  const { data: { data: question = questionFromStore } = {}, refetch } = useGetQuestionByIdQuery(id);

  const [addSubmission] = useAddSubmissionMutation();

  const submissionsDisabled = Date.now() > new Date(2022, 9, 1, 15, 0, 0).getTime();

  const onFileChange = (e) => {
    if (!isEmpty(e.target.files)) {
      uploadFile(e.target.files[0])
        .then((url) => {
          addSubmission({
            question: id,
            link: url
          })
            .unwrap()
            .then(() => {
              toast({ title: "Submission added successfully" });
              refetch();
            });
        })
        .catch((e) => {
          console.error(`Submission failed - message: `, e.message);
          toast({ variant: "destructive", title: "Submission upload failed" });
        });
    }
  };

  useTitle("Challenge | Bashaway");

  const cardStyles = useMemo(() => challengeColor(question), [question]);

  useEffectOnce(() => {
    window.scroll({ top: 0, behavior: "smooth" });
  });

  return (
    <>
      <BreadCrumbs breadcrumbs={["Home", "Challenge"]} />
      <div className="group h-full w-full animated-border text-border from-black/20 to-border p-5 rounded-3xl mt-12 lg:mt-8">
        <AnimatedSwitcher
          show={!isEmpty(question)}
          className="cursor-default"
          component={
            <div
              className={twMerge(
                "w-full flex flex-col p-5 gap-6 rounded-2xl transition-all duration-medium",
                cardStyles
              )}
            >
              <SubmissionCount question={question} />
              <Subheadline className="transition-all duration-medium">{question?.name}</Subheadline>
              <ReactMarkdown className="markdown [&>p]:font-semibold line-clamp-3">
                {question?.description}
              </ReactMarkdown>
              <div className="flex flex-wrap gap-3 [&>span]:px-3 [&>span]:py-2 [&>span]:rounded-lg [&>span]:transition-all [&>span]:duration-medium">
                <Subtitle>{startCase(question?.difficulty?.toLowerCase())}</Subtitle>
                <Subtitle>{question?.max_score}PT</Subtitle>
                <Subtitle>{question?.constraints?.join(", ")}</Subtitle>
              </div>
              <ActionButtons question={question} />
            </div>
          }
          alternateComponent={
            <Skeleton containerClassName="flex" className="flex flex-col p-5 gap-6 rounded-2xl">
              <SubmissionCount question={question} className="z-50" />
              <Skeleton className="w-3/4 md:w-1/2 h-[1.5rem] mt-1.5" shade="dark" />
              <Skeleton containerClassName=" mt-2" className="w-full h-[1.1rem] mb-[0.12rem]" count={3} shade="dark" />
              <div className="flex flex-wrap gap-3 [&>span]:border-2 [&>span]:border-black/10 [&>span]:px-3 [&>span]:py-2 [&>span]:rounded-lg z-50">
                <Skeleton className="w-[2.25rem] h-6 rounded-sm" shade="dark" />
                <Skeleton className="w-[2.25rem] h-6 rounded-sm" shade="dark" />
                <Skeleton className="w-[2.25rem] h-6 rounded-sm" shade="dark" />
              </div>
              <ActionButtons question={question} className="z-50" buttonClassName="py-2.5" />
            </Skeleton>
          }
        />
      </div>
      <Button
        className="px-6 text-[20px] mt-12"
        disabled={submissionsDisabled}
        onClick={() => {
          document.getElementById("file-upload").click();
        }}
      >
        <Plus />
        Add Submission
      </Button>
      <input id="file-upload" type="file" className="hidden" onChange={onFileChange} />
    </>
  );
}
