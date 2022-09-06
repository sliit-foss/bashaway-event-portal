import React from 'react'
import Navbar from '../components/common/Navbar'

export default function Questions() {
  return (
    <div>
      <Navbar />
      <div>
        <div className="flex flex-row items-center justify-start p-4 pl-10 w-auto ">
          <h1 className="text-1 font-semibold pr-6">Home</h1>
          <div className=" border-t border-black w-11/12 justify-self-end "></div>
        </div>
      </div>
    </div>
  )
}
