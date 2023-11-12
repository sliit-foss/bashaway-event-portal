import { useMemo, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { default as ReactMarkdown } from "react-markdown";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { default as isEmpty } from "lodash/isEmpty";
import { default as startCase } from "lodash/startCase";
import { twMerge } from "tailwind-merge";
import { ActionButtons } from "@/components/challenge-details";
import { useEffectOnce, useTitle } from "@/hooks";
import { uploadSubmission } from "@/services";
import { store } from "@/store";
import {
  selectChallengeById,
  submissionApi,
  updateChallengeStateById,
  useAddSubmissionMutation,
  useGetChallengeByIdQuery
} from "@/store/api";
import { challengeColor } from "@/utils";
import { AnimatedSwitcher, Badge, BreadCrumbs, Skeleton, toast } from "@sliit-foss/bashaway-ui/components";
import { Body3, Footnote } from "@sliit-foss/bashaway-ui/typography";

export default function ChallengeDetails() {
  const { id } = useParams();

  const [uploading, setUploading] = useState(false);

  const challengeFromStore = useSelector(selectChallengeById(id));

  const { data: { data: challenge = challengeFromStore } = {} } = useGetChallengeByIdQuery(id);

  const [addSubmission, { isLoading }] = useAddSubmissionMutation();

  const onFileChange = async (e) => {
    if (!isEmpty(e.target.files)) {
      setUploading(true);
      try {
        const file = e.target.files[0];
        if (file.size > 26214400)
          return toast({ variant: "destructive", title: "Submission size should be less than 25MB" });
        if (!["zip"].includes(file.name?.split(".").pop()))
          return toast({ variant: "destructive", title: "Submission should be a zip archive" });
        const url = await uploadSubmission(file);
        await addSubmission({ challenge: id, link: url })
          .unwrap()
          .then(() => {
            toast({ title: "Submission added successfully" });
            updateChallengeStateById(store, id, {
              total_submissions: !challenge.submitted ? challenge.total_submissions + 1 : challenge.total_submissions,
              submitted: true
            });
            store.dispatch(submissionApi.util.resetApiState());
            document.getElementById("file-upload").value = "";
          });
      } catch (e) {
        toast({ variant: "destructive", title: "Submission upload failed" });
      } finally {
        setUploading(false);
      }
    }
  };

  useTitle("Challenge | Bashaway");

  const cardStyles = useMemo(() => challengeColor(challenge), [challenge]);

  useEffectOnce(() => {
    window.scroll({ top: 0, behavior: "smooth" });
  });

  return (
    <>
      <BreadCrumbs breadcrumbs={["Home", "Challenge"]} />
      <div className="group h-full w-full animated-border text-border from-black/20 to-border p-5 rounded-3xl mt-12 lg:mt-8">
        <AnimatedSwitcher
          show={!isEmpty(challenge)}
          className="cursor-default"
          component={
            <div className={twMerge("w-full flex flex-col p-5 gap-6 rounded-2xl", cardStyles)}>
              <Badge className="normal-case border flex justify-center self-start items-center gap-1.5">
                {!isEmpty(challenge) ? challenge?.total_submissions : <Skeleton className="w-1.5 h-2" shade="dark" />}{" "}
                {challenge?.total_submissions === 1 ? "team " : "teams "}
                submitted
                <CheckCircle2 size={16} />
              </Badge>
              <Body3 className="font-bold transition-all duration-medium">{challenge?.name}</Body3>
              <ReactMarkdown className="markdown [&>p]:font-semibold">{challenge?.description}</ReactMarkdown>
              <div className="flex flex-wrap gap-3 [&>span]:px-3 [&>span]:py-2 [&>span]:rounded-lg [&>span]:transition-all [&>span]:duration-medium">
                <Footnote>{startCase(challenge?.difficulty?.toLowerCase())}</Footnote>
                <Footnote>{challenge?.max_score}PT</Footnote>
                {challenge?.constraints?.length && <Footnote>{challenge?.constraints?.join(", ")}</Footnote>}
              </div>
              <ActionButtons challenge={challenge} loading={uploading || isLoading} />
            </div>
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
              <ActionButtons challenge={challenge} className="z-50" buttonClassName="py-2.5" />
            </Skeleton>
          }
        />
      </div>
      <input id="file-upload" type="file" className="hidden" onChange={onFileChange} />
    </>
  );
}
