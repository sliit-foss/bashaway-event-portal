import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { IoStar } from 'react-icons/io5'
import Layout from '../components/layout'
import { getQuestionById } from '../services/question'

export default function QuestionView() {
  const { id } = useParams()

  const [question, setQuestion] = useState(null)

  useEffect(() => {
    getQuestionById(id).then((res) => {
      setQuestion(res.data)
    })
  }, [id])

  return (
    <Layout>
      <div className="w-screen min-h-screen flex flex-col justify-center items-center">
        {question && (
          <div className="w-full min-h-screen flex flex-col justify-start items-center mt-28 mb-12">
            <div className="w-10/12 flex justify-start items-center mb-4">
              <span className="text-white text-2xl mr-4">Challenge</span>
              <div className="h-0.5 w-full bg-white" />
            </div>
            <div className="w-10/12 items-center bg-card/30 shadow-md border border-[#ffffff26] rounded-md overflow-hidden my-4 px-3 py-6 md:px-6 md:py-8 grid md:grid-cols-5">
              <div className="md:col-span-3">
                <div className="flex items-center ">
                  <IoStar className="text-white" />
                  <h3 className="ml-2 text-md md:text-lg text-white">{question.name}</h3>
                </div>
                <div className="grid sm:grid-cols-3 text-xs text ml-6 mt-4 text-gray-400">
                  <p>Complexity - {question.difficulty}</p>
                  <p>Maximum Score - {question.max_score}</p>
                  <p>Constraints - {question.constraints.join(',')}</p>
                </div>
              </div>
              <div className="flex mt-4 ml-6 items-center md:justify-end mr-8 sm:ml-6 sm:mt-4 md:col-span-2 md:mt-0 md:ml-0 ">
                <span className=" px-6 py-2 font-semibold sm:text-xl focus:outline-none focus:ring focus:ring-offset-1 cursor-pointer bg-white text-black rounded-md hover:bg-primary hover:text-white focus:ring-black focus:ring-opacity-20 transition-all duration-300">Attempt Now</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}
