import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './episode-details.css'
import {Pagination} from '../pagination/Pagination'
import { AnimeDescription } from '../anime-description/AnimeDescription'

export const EpisodeDetails = ({episodeId, currentEpisode}) => {
   const [episodeDetails, setEpisodeDetails] = useState([])
   const [episodeList, setEpisodeList] = useState([])
   const [currentPage, setCurrentPage] = useState(1)
   const episodePerPage = 100
   const animeId = episodeId.toLowerCase().slice(0, episodeId.indexOf("-episode"))
   
   const apiRequest = async () => {
         const result = await axios.get(`https://gogoanime.consumet.stream/anime-details/${animeId}`)
         console.log(animeId)
         setEpisodeDetails(result.data)
         setEpisodeList(result.data.episodesList.reverse())
      }
   useEffect(() => {
      try{
         apiRequest()
      }
      catch(e){
         console.error(e)
      }
   }, [episodeId])

   /*          100                1           100     */
   const lastEpisodeIndex = currentPage * episodePerPage
   /*          0                   100                100 */
   const firstEpisodeIndex = lastEpisodeIndex - episodePerPage
   /*   episodes from 0-99                         0                 100   */
   const currentEpisodes = episodeList.slice(firstEpisodeIndex, lastEpisodeIndex)


   return (
      <div className='episode-details'>
         <div className="details-container">
            {episodeList ? <AnimeDescription animeDetails={episodeDetails} animeId={animeId} /> : ""}
         </div>
         <div className="episode-list">
            <Pagination 
               totalEpisode={episodeList.length} 
               episodePerPage={episodePerPage} 
               setCurrentPage={setCurrentPage}
               lastEpisode={episodeList[episodeList.length-1]?.episodeNum}
               />
            {currentEpisodes ?
               
               currentEpisodes.map((episode,index) => {
                  return(
                     <Link 
                     to={`/watch/${episode.episodeId}`} 
                     className={`episode-btn ${episode.episodeNum === currentEpisode && "active"}`}
                     key={index}
                     >{episode.episodeNum}</Link>
                  )
               })
            : <div>No episodes available</div>
            }
         </div>
      </div>
   )
}