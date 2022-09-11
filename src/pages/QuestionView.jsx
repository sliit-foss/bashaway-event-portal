import React from 'react'
import Navbar from '../components/common/Navbar'

export default function QuestionView() {
  return (
    <div className="flex flex-col bg-slate-100 ">
      <Navbar />
      <div className=" flex flex-col justify-center">
        <div className="flex flex-row items-center justify-start p-12 pl-10 ">
          <h1 className="text-2xl font-semibold pr-6">Challenge</h1>
          <div className=" border-t border-black w-11/12 justify-self-end "></div>
        </div>
        {/* white box div */}
        <div className="px-20 pb-20  ">
          <div className="flex w-full bg-white p-10 shadow-md shadow-slate-400">
            <div className="flex flex-col flex-1  justify-center">
              <div className="flex items-center ">
                <img src="assets/images/Star.png" alt="star" className=" h-[17px] pr-4 " />
                <h1 className="text-3xl font-bold ">Day Of The Programmer</h1>
              </div>
              <div className="text-xs text-input-border ml-9 ">
                <span className="pr-6">Complexity - Easy</span>
                <span className="pr-6">Max Score - 200</span>
                <span className="pr-6">Constraints - Bash, Java, Python</span>
              </div>
            </div>
            <div className="flex flex-1 items-center justify-end ">
              <button className="flex items-center text-center bg-black hover:bg-gray-800 text-white text-sm font-semibold py-3 px-4  mr-10 rounded h-10  ">Submit Now</button>
            </div>
          </div>
          <div className="flex flex-col w-full bg-white px-32  shadow-md shadow-slate-400">
            <div className="flex pb-10 ">
              <span className="text-2xl font-bold ">The Story</span>
            </div>
            <div className="flex h-56 bg-slate-500 w-8/12 mx-auto"> image</div>
            <div className="flex py-12 text-lg">
              <p className="text-justify font-sans font-medium">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five
                centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions
                of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not
                only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including
                versions of Lorem Ipsum.
              </p>
            </div>
            <div className="flex  pb-10 ">
              <span className="text-2xl font-bold ">Technology Constraint</span>
            </div>
            <div className="flex  pb-12 text-lg">
              <p className="text-justify font-sans font-medium">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five
                centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions
                of Lorem Ipsum.
              </p>
            </div>
            <div className="flex  pb-10 ">
              <span className="text-2xl font-bold ">Prerequisites</span>
            </div>
            <div className="flex pb-12 text-lg">
              <p className="text-justify font-sans font-medium">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five
                centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions
                of Lorem Ipsum.
              </p>
            </div>
            <div className="flex flex-row mb-10">
              <div className="flex flex-row items-center justify-start w-1/2">
                <button className="flex items-center text-center bg-black hover:bg-gray-800 text-white text-sm font-semibold py-3 px-4  mr-10 rounded h-10  ">Download File Structure</button>
              </div>
              <div className="flex flex-row items-center justify-end w-1/2">
                <button className="flex items-center text-center bg-black hover:bg-gray-800 text-white text-sm font-semibold py-3 px-4 rounded h-10  ">Submit Now</button>
              </div>
            </div>
            <div className="flex flex-row border-t border-black w-full justify-center mt-10 mb-20 "></div>
          </div>
        </div>
      </div>
    </div>
  )
}
