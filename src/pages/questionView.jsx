import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { IoStar } from 'react-icons/io5'
import { toast } from 'react-toastify'
import Layout from '../components/layout'
import { getQuestionById } from '../services/question'
import { Button } from '../components/common'
import { uploadFile } from '../services/azure'

export default function QuestionView() {
  const { id } = useParams()

  const [question, setQuestion] = useState(null)

  useEffect(() => {
    getQuestionById(id).then((res) => {
      setQuestion(res.data)
    })
  }, [id])

  const onFileChange = (e) => {
    uploadFile(e.target.files[0])
      .then(() => {
        toast.success('Submission added successfully')
      })
      .catch((e) => {
        console.error(`Error during submission - message: `, e.message)
        toast.error('Submission failed')
      })
  }

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
                <Button
                  className="px-6 py-2 font-semibold md:text-xl focus:outline-none focus:ring focus:ring-offset-1 bg-white focus:ring-black focus:ring-opacity-10"
                  onClick={() => {
                    document.getElementById('file-upload').click()
                  }}
                >
                  Attempt Now
                </Button>
              </div>
            </div>
            <div className="w-10/12 flex mt-4 justify-start items-center">
              <a href={question.codebase_url} download>
                <Button className="px-6 py-2 font-semibold md:text-xl focus:outline-none focus:ring focus:ring-offset-1 bg-white focus:ring-black focus:ring-opacity-10">Download Attachments</Button>
              </a>
            </div>
            <input id="file-upload" type="file" className="hidden" onChange={onFileChange} />
          </div>
        )}
      </div>
    </Layout>
  )
}
