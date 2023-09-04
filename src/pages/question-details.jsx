import { useMemo, useState } from "react";
import { useEffect } from "react";
import { CheckCircle2 } from "lucide-react";
import { default as ReactMarkdown } from "react-markdown";
import { MotionScene, MotionScreen, SharedElement } from "react-motion-layout";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createSelector } from "@reduxjs/toolkit";
import { isEmpty, startCase } from "lodash";
import { twMerge } from "tailwind-merge";
import { ActionButtons } from "@/components/question-details";
import { useEffectOnce, useTitle } from "@/hooks";
import { tracker, uploadFile } from "@/services";
import { store } from "@/store";
import { submissionApi, useAddSubmissionMutation, useGetQuestionByIdQuery } from "@/store/api";
import { challengeColor } from "@/utils";
import { AnimatedSwitcher, Badge, BreadCrumbs, Skeleton, toast } from "@sliit-foss/bashaway-ui/components";
import { Body3, Footnote } from "@sliit-foss/bashaway-ui/typography";

export default function QuestionDetails() {
  const { id } = useParams();

  const [uploading, setUploading] = useState(false);

  const questionFromStore = useSelector(
    createSelector(
      (store) => store.questionApi.queries,
      (queries) =>
        Object.values(queries)
          ?.sort((a, b) => b?.fulfilledTimeStamp - a.fulfilledTimeStamp)?.[0]
          ?.data?.data?.docs?.filter((q) => q?._id === id)?.[0]
    )
  );

  const { data: { data: question = questionFromStore } = {}, refetch, isSuccess } = useGetQuestionByIdQuery(id);

  const [addSubmission, { isLoading }] = useAddSubmissionMutation();

  const onFileChange = async (e) => {
    if (!isEmpty(e.target.files)) {
      setUploading(true);
      try {
        const url = await uploadFile(e.target.files[0]);
        await addSubmission({ question: id, link: url })
          .unwrap()
          .then(() => {
            toast({ title: "Submission added successfully" });
            refetch();
            store.dispatch(submissionApi.util.resetApiState());
            document.getElementById("file-upload").value = "";
          });
      } catch (e) {
        console.error(`Submission failed - message: `, e.message);
        toast({ variant: "destructive", title: "Submission upload failed" });
      } finally {
        setUploading(false);
      }
    }
  };

  useTitle("Challenge | Bashaway");

  const cardStyles = useMemo(() => challengeColor(question), [question]);

  useEffectOnce(() => {
    window.scroll({ top: 0, behavior: "smooth" });
  });

  useEffect(() => {
    if (isSuccess && question?._id)
      tracker.event("challenge_view", {
        challenge_id: question?._id,
        challenge_name: question?.name,
        challenge_difficulty: question?.difficulty
      });
  }, [question, isSuccess]);

  return (
    <MotionScreen>
      <BreadCrumbs breadcrumbs={["Home", "Challenge"]} />
      <div className="group h-full w-full animated-border text-border from-black/20 to-border p-5 rounded-3xl mt-12 lg:mt-8">
        <AnimatedSwitcher
          show={!isEmpty(question)}
          className="cursor-default"
          component={
            <MotionScene name={`question-${question?._id}`} scrollUpOnEnter>
              <div className={twMerge("w-full flex flex-col p-5 gap-6 rounded-2xl", cardStyles)}>
                <Badge className="normal-case border flex justify-center self-start items-center gap-1.5">
                  {!isEmpty(question) ? question?.total_submissions : <Skeleton className="w-1.5 h-2" shade="dark" />}{" "}
                  {question?.total_submissions === 1 ? "team " : "teams "}
                  submitted
                  <CheckCircle2 size={16} />
                </Badge>
                <SharedElement.Text animationKey={`question-title-${question?._id}`}>
                  <Body3 className="font-bold transition-all duration-medium">{question?.name}</Body3>
                </SharedElement.Text>
                <ReactMarkdown className="markdown [&>p]:font-semibold">{question?.description}</ReactMarkdown>
                <div className="flex flex-wrap gap-3 [&>span]:px-3 [&>span]:py-2 [&>span]:rounded-lg [&>span]:transition-all [&>span]:duration-medium">
                  <Footnote>{startCase(question?.difficulty?.toLowerCase())}</Footnote>
                  <Footnote>{question?.max_score}PT</Footnote>
                  {question?.constraints?.length && <Footnote>{question?.constraints?.join(", ")}</Footnote>}
                </div>
                <ActionButtons question={question} loading={uploading || isLoading} />
              </div>
            </MotionScene>
          }
          alternateComponent={
            <Skeleton containerClassName="flex" className="flex flex-col p-5 gap-6 rounded-2xl">
              <Skeleton className="w-[167px] h-[2.1rem] rounded-full" shade="dark" />
              <Skeleton className="w-3/4 md:w-1/2 h-[1.1em] lg:h-[1.35rem] mt-1.5" shade="dark" />
              <Skeleton
                containerClassName=" mt-2"
                className="w-full h-[0.98rem] sm:h-[1.05rem] lg:h-[1.13rem] mt-[0.05rem] mb-[0.1rem]"
                count={3}
                shade="dark"
              />
              <Skeleton
                containerClassName="flex flex-wrap gap-1.5 mt-[0.1rem]"
                className="w-[4rem] h-[2.6rem] mb-[0.08rem] rounded-[7px] z-50"
                count={3}
                shade="dark"
              />
              <ActionButtons question={question} className="z-50" buttonClassName="py-2.5" />
            </Skeleton>
          }
        />
      </div>
      <input id="file-upload" type="file" className="hidden" onChange={onFileChange} />
    </MotionScreen>
  );
}
