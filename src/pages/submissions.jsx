import { useState } from "react";
import { Pagination } from "flowbite-react";
import { useParams } from "react-router-dom";
import { NoRecords, Sorts } from "@/components/common";
import { default as Layout } from "@/components/layout";
import { Submission } from "@/components/submissions";
import { submissionSorts } from "@/filters";
import { useGetMySubmissionsQuery } from "@/store/api";

const Submissions = () => {
  const { id: questionId } = useParams();

  const [page, setPage] = useState(1);
  const [sorts, setSorts] = useState("");

  const { data: submissions } = useGetMySubmissionsQuery({ filters: `filter[question]=${questionId}`, sorts, page });

  return (
    <Layout title="Bashaway | Submissions">
      <div className="w-screen min-h-screen flex flex-col justify-center items-center">
        {submissions && (
          <>
            <div className="w-10/12 flex flex-col justify-center items-start mt-24 mb-5">
              <Sorts sorts={submissionSorts} setSortQuery={setSorts} />
            </div>
            <div className="w-10/12 min-h-screen flex flex-col justify-between items-center mb-16">
              <div className="w-full h-full flex flex-col justify-start items-center gap-y-6">
                {submissions.data?.docs?.length > 0 ? (
                  submissions.data?.docs?.map((submission) => {
                    return <Submission key={submission._id} submission={submission} />;
                  })
                ) : (
                  <NoRecords text="No Submissions Made Yet" className="mt-12" />
                )}
              </div>
              <div className="w-full flex justify-end items-center mt-4 md:mt-0">
                <Pagination
                  currentPage={page}
                  onPageChange={(newPage) => {
                    setPage(newPage);
                  }}
                  showIcons={true}
                  totalPages={submissions.data?.totalPages}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Submissions;
