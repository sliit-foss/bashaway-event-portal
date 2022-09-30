import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Pagination } from 'flowbite-react'
import Layout from '../components/layout'
import { Sorts, NoRecords } from '../components/common'
import { Submission } from '../components/submissions'
import { getMySubmissions } from '../services/submission'
import { submissionSorts } from '../filters'

const Submissions = () => {
  const { id: questionId } = useParams()

  const [submissionRes, setSubmissionRes] = useState(null)
  const [page, setPage] = useState(1)
  const [sortQuery, setSortQuery] = useState('')

  useEffect(() => {
    getMySubmissions(`filter[question]=${questionId}`, sortQuery, page).then((res) => {
      setSubmissionRes(res.data)
    })
  }, [page, sortQuery])

  return (
    <Layout title="Bashaway | Submissions">
      <div className="w-screen min-h-screen flex flex-col justify-center items-center">
        {submissionRes && (
          <>
            <div className="w-10/12 flex flex-col justify-center items-start mt-24 mb-5">
              <Sorts sorts={submissionSorts} setSortQuery={setSortQuery} />
            </div>
            <div className="w-10/12 min-h-screen flex flex-col justify-between items-center mb-16">
              <div className="w-full h-full flex flex-col justify-start items-center gap-y-6">
                {submissionRes.docs?.length > 0 ? (
                  submissionRes.docs?.map((submission) => {
                    return <Submission submission={submission} />
                  })
                ) : (
                  <NoRecords text="No Submissions Made Yet" className="mt-12" />
                )}
              </div>
              <div className="w-full flex justify-end items-center mt-4 md:mt-0">
                <Pagination
                  currentPage={page}
                  onPageChange={(newPage) => {
                    setPage(newPage)
                  }}
                  showIcons={true}
                  totalPages={submissionRes.totalPages}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  )
}

export default Submissions
