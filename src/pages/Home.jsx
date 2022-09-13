import Question from '../components/Question'
import { useEffect, useState } from 'react'

const { VITE_ACCESS_TOKEN } = import.meta.env

const Home = () => {
  const [questions, setQuestions] = useState(null)

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch('http://localhost:3001/api/questions', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${VITE_ACCESS_TOKEN}`,
        },
      })

      const json = await response.json()

      if (response.ok) {
        setQuestions(json.data)
      }
    }
    fetchQuestions()
  }, [])

  return (
    <div>
      <div className=" xl:mx-40 mx-8">
        <div className="flex items-center py-4">
          <h1 className="flex-shrink text-2xl text-gray-900 xl:px-4">Home</h1>
          <div className="flex-grow ml-4 xl:ml-8 h-px bg-gray-900"></div>
        </div>
        <div className="mx-8 my-8">{questions && questions.map((question) => <Question key={question._id} question={question} />)}</div>
      </div>
    </div>
  )
}

export default Home
