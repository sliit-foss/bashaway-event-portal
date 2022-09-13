import { IoStar } from 'react-icons/io5'
const Question = ({ question }) => {
  return (
    <div className="flex items-center bg-white shadow-md overflow-hidden my-4 px-3 py-6 md:px-6 md:py-8 grid md:grid-cols-5">
      <div className="md:col-span-3">
        <div className="flex items-center ">
          <IoStar />
          <h3 className="ml-2 text-md md:text-lg  text-gray-800  ">{question.name}</h3>
        </div>
        <div className="grid sm:grid-cols-3 text-xs text ml-6 mt-4 text-gray-400">
          <p>Complexity -{question.difficulty}</p>
          <p>Max Score - {question.max_score}</p>
          <p>Constraints - Bash, Java, Python</p>
        </div>
        <div className="ml-6 text-sm mt-4">
          <p>{question.description}</p>
        </div>
      </div>
      <div className="flex mt-4 ml-6 items-center md:justify-end mr-8 sm:ml-6 sm:mt-4 md:col-span-2 md:mt-0 md:ml-0 ">
        <a href="/home" className=" px-6 py-2 font-semibold  sm:text-xl focus:outline-none focus:ring focus:ring-offset-2 bg-black text-white rounded-md   hover:bg-opacity-90 focus:ring-black focus:ring-opacity-50">
          Attempt Now
        </a>
      </div>
    </div>
  )
}

export default Question
