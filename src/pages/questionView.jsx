import { useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { IoStar } from 'react-icons/io5'
import { toast } from 'react-toastify'
import { isEmpty } from 'lodash'
import ReactMarkdown from 'react-markdown'
import Layout from '../components/layout'
import { getQuestionById } from '../services/question'
import { addSubmission } from '../services/submission'
import { Button } from '../components/common'
import { uploadFile } from '../services/azure'
import { useEffectOnce } from '../hooks'
import { downloadFile } from '../helpers'

export default function QuestionView() {
  const { id } = useParams()

  const navigate = useNavigate()

  const [question, setQuestion] = useState(null)

  const submissionsDisabled = Date.now() > new Date(2022, 9, 1, 14, 0, 0).getTime()

  const refresh = () => {
    getQuestionById(id).then((res) => {
      setQuestion(res.data)
    })
  }

  useEffectOnce(() => {
    refresh()
  })

  const onFileChange = (e) => {
    if (!isEmpty(e.target.files)) {
      uploadFile(e.target.files[0])
        .then((url) => {
          addSubmission({
            question: id,
            link: url,
          }).then((res) => {
            if (res.success) {
              toast.success('Submission added successfully')
              refresh()
            }
          })
        })
        .catch((e) => {
          console.error(`Error during submission - message: `, e.message)
          toast.error('Submission failed')
        })
    }
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
            <div className="w-10/12  bg-card/30 shadow-md border border-[#ffffff26] rounded-md overflow-hidden my-4 px-3 py-6 md:px-6 md:py-8">
              <div className="w-full grid md:grid-cols-6 2xl:grid-cols-5 items-center">
                <div className="md:col-span-3">
                  <div className="flex items-center ">
                    <IoStar className="text-white" />
                    <h3 className="ml-2 text-md md:text-lg text-white">{question.name}</h3>
                  </div>
                  <div className="grid sm:grid-cols-2 2xl:grid-cols-4 text-xs gap-y-6 text ml-6 mt-4 text-gray-400">
                    <p>Complexity - {question.difficulty}</p>
                    <p>Maximum Score - {question.max_score}</p>
                    <p>Total Submissions - {question.total_submissions}</p>
                    <p>Constraints - {question.constraints?.join(',')}</p>
                  </div>
                </div>
                <div className="w-full flex mt-4 ml-6 items-center md:justify-end mr-8 sm:ml-6 sm:mt-4 md:col-span-3 2xl:col-span-2 md:mt-0 md:ml-0 ">
                  <Button
                    className={`px-6 py-2 mr-4 font-semibold md:text-xl focus:outline-none focus:ring focus:ring-offset-1 ${question.total_submissions === 0 ? '' : 'bg-white'}  focus:ring-black focus:ring-opacity-10`}
                    disabled={question.total_submissions === 0}
                    onClick={() => {
                      navigate(`/questions/${question._id}/submissions`)
                    }}
                  >
                    View Submissions
                  </Button>
                  <Button
                    className={`px-6 py-2 font-semibold md:text-xl focus:outline-none focus:ring focus:ring-offset-1 ${submissionsDisabled ? '' : 'bg-white'} focus:ring-black focus:ring-opacity-10`}
                    disabled={submissionsDisabled}
                    onClick={() => {
                      document.getElementById('file-upload').click()
                    }}
                  >
                    Add Submission
                  </Button>
                </div>
              </div>
              <div className="w-11/12 flex justify-start items-center my-6 pl-6">
                <ReactMarkdown className="invert markdown" children={question.description} />
              </div>
              <div className="w-10/12 flex mt-10 mb-4 ml-6 justify-start items-center">
                <Button
                  className="px-6 py-2 font-semibold md:text-xl focus:outline-none focus:ring focus:ring-offset-1 cursor-pointer bg-white focus:ring-black focus:ring-opacity-10"
                  onClick={() => {
                    downloadFile(question.codebase_url)
                  }}
                >
                  Download Attachments
                </Button>
              </div>
            </div>

            <input id="file-upload" type="file" className="hidden" onChange={onFileChange} />
          </div>
        )}
      </div>
    </Layout>
  )
}
