import React from 'react'
import './notfound.css'
import { Link } from 'react-router-dom'
import { PageTitle } from '../../components/page-title/PageTitle'

export const NotFound = () => {
  PageTitle("404 Not Found")
  return (
   <section className='error-page'>
      <div className="error-message">
      <h2>404 NOT FOUND!</h2>
      <p>Return to <Link to="/">Homepage</Link></p>
      </div>
      
   </section>
  )
}