import { useState } from "react";
import { Pagination } from "flowbite-react";
import { Filters, NoRecords, Sorts } from "@/components/common";
import { Question, Timer } from "@/components/home";
import { default as Layout } from "@/components/layout";
import { questionFilters, questionSorts } from "@/filters";
import { useGetQuestionsQuery } from "@/store/api";

const openingDate = new Date(2022, 9, 1, 9, 0, 0).getTime();

const Home = () => {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState("");
  const [sorts, setSorts] = useState("");

  const { data: questions } = useGetQuestionsQuery({ filters, sorts, page });

  return (
    <Layout title="Bashaway | Home">
      <div className="w-screen min-h-screen flex flex-col justify-center items-center">
        {Date.now() >= openingDate ? (
          questions && (
            <>
              <div className="w-10/12 flex flex-col justify-center items-start mt-24 mb-5">
                <Filters filters={questionFilters} setFilterQuery={setFilters} />
                <Sorts sorts={questionSorts} setSortQuery={setSorts} />
              </div>
              <div className="w-10/12 min-h-screen flex flex-col justify-between items-center mb-16">
                <div className="w-full h-full flex flex-col justify-start items-center gap-y-6">
                  {questions.data?.docs?.length > 0 ? (
                    questions.data?.docs?.map((question) => {
                      return (
                        <div key={`question-list-${question.id}`} className="w-full flex justify-center items-center">
                          <Question question={question} />
                        </div>
                      );
                    })
                  ) : (
                    <NoRecords text="No Questions Found" className="mt-12" />
                  )}
                </div>
                <div className="w-full flex justify-end items-center mt-4 md:mt-0">
                  <Pagination
                    currentPage={page}
                    onPageChange={(newPage) => {
                      setPage(newPage);
                    }}
                    showIcons={true}
                    totalPages={questions.data?.totalPages}
                  />
                </div>
              </div>
            </>
          )
        ) : (
          <>
            <span className="text-gray-light text-center text-3xl sm:text-5xl md:text-6xl lg:text-7xl mb-12 font-semibold">
              Competition Starts In
            </span>
            <Timer />
          </>
        )}
      </div>
    </Layout>
  );
};

export default Home;
