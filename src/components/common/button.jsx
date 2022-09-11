const Button = ({ children, ...props }) => {
  return (
    <button {...props} className={`bg-gray-light hover:bg-primary rounded-md flex items-center justify-center text-base font-normal hover:text-white transition duration-300 ${props.className}`}>
      {children}
    </button>
  )
}

export default Button
