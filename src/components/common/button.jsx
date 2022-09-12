const Button = ({ children, ...props }) => {
  return (
    <button {...props} className={`${props.disabled ? 'bg-white/30' : 'bg-gray-light hover:bg-primary hover:text-white'} rounded-md flex items-center justify-center text-base font-normal transition duration-300 ${props.className}`}>
      {children}
    </button>
  )
}

export default Button
