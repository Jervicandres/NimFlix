import React from 'react'
import { Link } from 'react-router-dom'

export const Footer = () => {
  return (
    <footer>
      <p>
      Created By <Link to="https://github.com/Jervicandres" target="_blank" rel="noopener noreferrer">Jrvc</Link> | Powered By <Link to="https://consumet.org" target="_blank" rel="noopener noreferrer">Consumet</Link>
      </p>
    </footer>
  )
}
