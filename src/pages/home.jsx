import { useEffect, useState } from 'react'
import { Pagination } from 'flowbite-react'
import { Question, Timer } from '../components/home'
import Layout from '../components/layout'
import { getAllQuestions } from '../services/question'

const openingDate = new Date(2022, 9, 1, 0, 0, 0).getTime()

const Home = () => {
  const [questionRes, setQuestionRes] = useState(null)
  const [page, setPage] = useState(1)

  useEffect(() => {
    getAllQuestions(page).then((res) => {
      setQuestionRes(res.data)
    })
  }, [page])

  return (
    <Layout title="Bashaway | Home">
      <div className="w-screen min-h-screen flex flex-col justify-center items-center">
        {Date.now() < openingDate ? (
          questionRes && (
            <div className="w-10/12 min-h-screen flex flex-col justify-between items-center mt-24 mb-12">
              {questionRes.docs?.map((question) => {
                return (
                  <div className="w-full flex justify-center items-center">
                    <Question question={question} />
                  </div>
                )
              })}
              <div className="w-full flex justify-end items-center mt-4">
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
