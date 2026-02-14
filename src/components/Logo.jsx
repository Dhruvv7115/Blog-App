import React from 'react'

function Logo({ width = "50px" }) {
  const logoPath = "/BlogLogo.gif"; // Adjust the path as necessary
  return (
    <div>
      <img src={logoPath} alt="LOGO" width={width} className="object-cover object-bottom h-18" />
    </div>
  )
}

export default Logo;