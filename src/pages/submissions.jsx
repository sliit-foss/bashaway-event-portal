import { useState } from "react";
import { useParams } from "react-router-dom";
import { AnimatedSwitcher, BodyText2, BreadCrumbs, Filters, NoRecords, Pagination, Sorts } from "@/components/common";
import { Submission, SubmissionListSkeleton } from "@/components/submissions";
import { computeFilterQuery, computeSortQuery, submissionFilters, submissionSorts } from "@/filters";
import { useTitle } from "@/hooks";
import { useGetMySubmissionsQuery } from "@/store/api";
import { authUser } from "@/utils";

const Submissions = () => {
  const { id: questionId } = useParams();

  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState(computeFilterQuery(submissionFilters));
  const [sorts, setSorts] = useState(computeSortQuery(submissionSorts));

  const {
    data: submissions,
    isFetching,
    isError
  } = useGetMySubmissionsQuery({ filters: `filter[question]=${questionId}&${filters}`, sorts, page });

  useTitle("Submissions | Bashaway");

  return (
    <>
      <BreadCrumbs
        breadcrumbs={[
          "Home",
          {
            label: "Challenge",
            path: `/questions/${questionId}`
          },
          "Submissions"
        ]}
      />
      <div className="w-full h-full min-h-[70vh] flex flex-col border py-7 px-5 md:px-7 rounded-3xl mt-12 lg:mt-8">
        <BodyText2 className="text-[22px] font-medium">{authUser()?.name}&apos;s Submissions</BodyText2>
        <div className="divider !bg-black/10 mt-4 mb-7" />
        <div className="w-full flex flex-col md:flex-row gap-6">
          <Filters
            filters={submissionFilters}
            setFilterQuery={setFilters}
            styles={{ root: "md:w-5/12", filter: "md:w-3/4 lg:w-1/2 xl:w-5/12 2xl:w-4/12", input: "sm:h-12" }}
          />
          <Sorts
            sorts={submissionSorts}
            setSortQuery={setSorts}
            styles={{ root: "md:w-7/12 justify-end", sort: "md:w-full justify-center md:justify-end" }}
          />
        </div>
        <div className="flex flex-col flex-1 justify-between mt-8">
          <AnimatedSwitcher
            show={isFetching || isError}
            className={`flex-1 flex flex-col gap-6`}
            component={<SubmissionListSkeleton />}
            alternateComponent={
              submissions?.data?.docs?.length ? (
                <>
                  {submissions?.data?.docs?.map((submission) => (
                    <Submission key={`submission-${submission._id}`} submission={submission} />
                  ))}
                </>
              ) : (
                <div className="h-full flex flex-1 items-center">
                  <NoRecords text="You have not uploaded any submissions" />
                </div>
              )
            }
          />
          <div className="w-full flex justify-center items-center mt-6 mb-2">
            <Pagination
              currentPage={page}
              onPageChange={(newPage) => setPage(newPage)}
              totalPages={submissions?.data?.totalPages}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Submissions;
