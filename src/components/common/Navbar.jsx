export default function Navbar() {
  return (
    <nav className=" bg-black shadow-md shadow-slate-400">
      <div className="flex flex-row max-h-16 mx-6 px-4  shadow-xl">
        <div className="flex flex-1 justify-start items-center h-16">
          <img src="assets/images/BashawayLogo.png" alt="logo" class="pt-4 pb-3  h-[60px]" />
        </div>
        <div className="flex items-center">
          <ul className="flex flex-row">
            <li className="text-white text-lg font-bold font-sans  pl-6 ">Home</li>
            <li className="text-white text-lg font-bold font-sans  pl-6 ">Rules</li>
            <li className="text-white text-lg font-bold font-sans  pl-6">Settings</li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
