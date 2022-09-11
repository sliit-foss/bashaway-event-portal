const Button = ({ children, ...props }) => {
  return (
    <input {...props} className={`w-full h-14 sm:h-16 bg-transparent border-[1px] focus:border-primary outline-none rounded-md text-gray-100 p-4 text-base font-normal hover:text-white transition duration-300 ${props.className}`}>
      {children}
    </input>
  )
}

export default Button
