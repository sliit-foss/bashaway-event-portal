const ResetPassword = () => {
  return (
    <div className="bg-black w-screen h-screen flex ">
      <div className="flex-1 flex items-center justify-center">
        <img src="./assets/ResetPassword.svg" />
      </div>
      <div className="flex-1 mt-[167px] flex flex-col font-inter">
        {/* text-justify? */}
        <span className="text-white font-medium text-[32px] tracking-[-0.04em] my-14 text-justify">Reset Your Password</span>
        <input className="bg-transparent border-2 border-input-border rounded-[5px] h-16 w-[486px] p-4 text-gray-100" type="password" placeholder="New Password" />
        <input className="bg-transparent border-2 border-input-border rounded-[5px] h-16 w-[486px] p-4 text-gray-100 my-14" type="password" placeholder="Re-enter New Password" />
        <div className="bg-[#D9D9D9] w-[165px] h-[42px] rounded-[5px] flex justify-center items-center text-base font-normal">Reset Password</div>
      </div>
    </div>
  )
}

export default ResetPassword
