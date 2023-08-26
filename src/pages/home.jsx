import { useState } from "react";
import { Question, QuestionGridSkeleton } from "@/components/home";
import { questionFilters, questionSorts } from "@/filters";
import { useTitle } from "@/hooks";
import { useGetQuestionsQuery } from "@/store/api";
import { AnimatedSwitcher, Filters, NoRecords, Pagination, Sorts } from "@sliit-foss/bashaway-ui/components";
import { computeFilterQuery, computeSortQuery } from "@sliit-foss/bashaway-ui/utils";

const gridStyles = "w-full h-full grid grid-cols-1 lg:grid-cols-2 justify-start items-center gap-5";

const Home = () => {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState(computeFilterQuery(questionFilters));
  const [sorts, setSorts] = useState(computeSortQuery(questionSorts));

  const { data: questions, isFetching, isError } = useGetQuestionsQuery({ filters, sorts, page });

  useTitle("Home | Bashaway");

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center gap-6 mb-8">
        <Filters filters={questionFilters} setFilterQuery={setFilters} />
        <Sorts sorts={questionSorts} setSortQuery={setSorts} />
      </div>
      <div className="w-full min-h-[60vh] flex flex-col gap-12 justify-between items-center">
        <AnimatedSwitcher
          show={isFetching || isError}
          component={<QuestionGridSkeleton className={gridStyles} />}
          alternateComponent={
            questions?.data?.docs?.length ? (
              <div className={gridStyles}>
                {questions?.data?.docs?.map((question) => (
                  <Question key={`question-list-${question.id}`} question={question} />
                ))}
              </div>
            ) : (
              <NoRecords text="No challenges have been uploaded yet" className="mt-12" />
            )
          }
        />
        <div className="w-full flex justify-center items-center mt-6 mb-2">
          <Pagination
            currentPage={page}
            onPageChange={(newPage) => setPage(newPage)}
            totalPages={questions?.data?.totalPages}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
