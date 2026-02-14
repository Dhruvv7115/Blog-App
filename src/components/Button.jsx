import React from "react"

function Button({
  children, 
  type = "button",
  className = "",
  ...props
}) {
  return (
    <button type={type} className={`w-full cursor-pointer rounded px-4 py-2 bg-blue-600 text-white ${className}`} {...props}>{children}</button>
  )
}

export default Button