import { useEffect, useState } from 'react'
import { Pagination } from 'flowbite-react'
import { Question, Timer } from '../components/home'
import Layout from '../components/layout'
import { getAllQuestions } from '../services/question'
import { questionFilters, questionSorts } from '../filters'
import { Filters, NoRecords } from '../components/common'
import Sorts from '../components/common/sorts'

const openingDate = new Date(2022, 9, 1, 0, 0, 0).getTime()

const Home = () => {
  const [questionRes, setQuestionRes] = useState(null)
  const [page, setPage] = useState(1)
  const [filterQuery, setFilterQuery] = useState('')
  const [sortQuery, setSortQuery] = useState('')

  useEffect(() => {
    getAllQuestions(filterQuery, sortQuery, page).then((res) => {
      setQuestionRes(res.data)
    })
  }, [page, filterQuery, sortQuery])

  return (
    <Layout title="Bashaway | Home">
      <div className="w-screen min-h-screen flex flex-col justify-center items-center">
        {Date.now() < openingDate ? (
          questionRes && (
            <>
              <div className="w-10/12 flex flex-col justify-center items-start mt-24 mb-5">
                <Filters filters={questionFilters} setFilterQuery={setFilterQuery} />
                <Sorts sorts={questionSorts} setSortQuery={setSortQuery} />
              </div>
              <div className="w-10/12 min-h-screen flex flex-col justify-between items-center mb-16">
                <div className="w-full h-full flex flex-col justify-start items-center gap-y-6">
                  {questionRes.docs?.length > 0 ? (
                    questionRes.docs?.map((question) => {
                      return (
                        <div className="w-full flex justify-center items-center">
                          <Question question={question} />
                        </div>
                      )
                    })
                  ) : (
                    <NoRecords text="No Questions Found" className="mt-12" />
                  )}
                </div>
                <div className="w-full flex justify-end items-center mt-4 md:mt-0">
                  <Pagination
                    currentPage={page}
                    onPageChange={(newPage) => {
                      setPage(newPage)
                    }}
                    showIcons={true}
                    totalPages={questionRes.totalPages}
                  />
                </div>
              </div>
            </>
          )
        ) : (
          <>
            <span className="text-gray-light text-center text-3xl sm:text-5xl md:text-6xl lg:text-7xl mb-12 font-semibold">Competition Starts In</span>
            <Timer />
          </>
        )}
      </div>
    </Layout>
  )
}

export default Home
