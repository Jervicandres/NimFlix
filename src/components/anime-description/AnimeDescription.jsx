import React from 'react'
import { Link } from 'react-router-dom'
import { PageTitle } from '../page-title/PageTitle'
import './AnimeDescription.css'

export const AnimeDescription = ({animeDetails, animeId}) => {
   const {title, type, releaseDate, status, genres, image} = animeDetails
   const animeTitle = `${title?.english || title?.userPreferred || title?.romaji}`
   PageTitle(title ? ("Watching: " + animeTitle) : "Loading...")
   if(!title){
      return (
      <div className='anime-description-container'>
         <div className="anime-img-container">
            <img src={image || `https://via.placeholder.com/150/000000/FFFFFF/?text=Loading...`} alt={animeTitle} />
         </div>
      </div>
      )
   }

   return (
      <div className='anime-description-container'>
         <div className="anime-img-container">
         <img src={image || `https://via.placeholder.com/150/000000/FFFFFF/?text=Loading...`} alt={animeTitle} />
      </div>
      <div className="anime-details-container">
         <Link to={`/details/${animeId}`}>{animeTitle} ({status})</Link>
         <p>{type}</p>
         <p>Released: {releaseDate}</p>
         <p>Genre: {genres?.join(", ")}</p>
      </div>
      </div>
   )
}