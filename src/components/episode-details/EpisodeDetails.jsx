import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './episode-details.css'
import {Pagination} from '../pagination/Pagination'
import { AnimeDescription } from '../anime-description/AnimeDescription'

export const EpisodeDetails = ({animeId, currentEpisode}) => {
   const [episodeDetails, setEpisodeDetails] = useState([])
   const [episodeList, setEpisodeList] = useState([])
   const [currentPage, setCurrentPage] = useState(1)
   const episodePerPage = 100
   const animeURL = `https://api-consumet-o1ty.vercel.app/meta/anilist/info/${animeId}`
   
   useEffect(() => {
         const apiRequest = async () => {
            await axios.get(animeURL).then(({data}) => {
               setEpisodeDetails(data)
               setEpisodeList(data.episodes)
            })
            .catch(error=> console.error(error))
         }
         apiRequest()
   }, [currentEpisode,animeURL])

   /*          100                1           100     */
   const lastEpisodeIndex = currentPage * episodePerPage
   /*          0                   100                100 */
   const firstEpisodeIndex = lastEpisodeIndex - episodePerPage
   /*   episodes from 0-99                         0                 100   */
   const currentEpisodes = episodeList.slice(firstEpisodeIndex, lastEpisodeIndex)


   return (
      <div className='episode-details'>
         <div className="details-container">
            {episodeDetails ? <AnimeDescription animeDetails={episodeDetails} animeId={animeId} /> : ""}
         </div>
         <div className="episode-list">
            <Pagination 
               totalEpisode={episodeList.length} 
               episodePerPage={episodePerPage} 
               setCurrentPage={setCurrentPage}
               lastEpisode={episodeList[episodeList.length-1]?.number}
               />
            {currentEpisodes ?
               
               currentEpisodes.map((episode,index) => {
                  return(
                     <Link 
                     to={`/watch/${animeId}/${episode.id}`} 
                     className={`episode-btn ${episode.id === currentEpisode && "active"}`}
                     key={index}
                     >{episode.number}</Link>
                  )
               })
            : <div>No episodes available</div>
            }
         </div>
      </div>
   )
}