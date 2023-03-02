import React from 'react'
import { Link } from 'react-router-dom'
import { PageTitle } from '../page-title/PageTitle'
import './AnimeDescription.css'

export const AnimeDescription = ({animeDetails, animeId}) => {
   const {animeTitle, type, releasedDate, status, genres, animeImg} = animeDetails
   PageTitle(("Watching: " + animeTitle) || "Loading...")
   if(!animeTitle){
      return (
      <div className='anime-description-container'>
         <div className="anime-img-container">
            <img src={animeImg || `https://via.placeholder.com/150/000000/FFFFFF/?text=Loading...`} alt={animeTitle} />
         </div>
      </div>
      )
   }

   return (
      <div className='anime-description-container'>
         <div className="anime-img-container">
         <img src={animeImg || `https://via.placeholder.com/150/000000/FFFFFF/?text=Loading...`} alt={animeTitle} />
      </div>
      <div className="anime-details-container">
         <Link to={`/details/${animeId}`}>{animeTitle} ({status})</Link>
         <p>{type}</p>
         <p>Released: {releasedDate}</p>
         <p>Genre: {genres?.join(", ")}</p>
      </div>
      </div>
   )
}