export default function Navbar() {
  return (
    <nav className=" bg-black">
      <div className="flex flex-grow max-w-7xl max-h-12 mx-auto px-4 sm:px-6 lg:px-8 shadow-xl">
        <div className="flex flex-1 justify-start h-16">
          <img src="assets/images/BashawayLogo.png" alt="logo" class="pt-4 pb-3 pl-6 h-12" />
        </div>
        <div className="">
          <ul className="flex flex-row justify-items-end">
            <li className="text-white text-xs font-semibold font-sans pt-4 pl-6 ">Home</li>
            <li className="text-white text-xs font-semibold font-sans pt-4 pl-6 ">Rules</li>
            <li className="text-white text-xs font-semibold font-sans pt-4 pl-6">Settings</li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
