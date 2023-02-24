import axios from 'axios'
import React, { useState,useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { RiseLoader } from 'react-spinners'
import { PageTitle } from '../../components/page-title/PageTitle'
import { Pagination } from '../../components/pagination/Pagination'
import './animedetails.css'

export const AnimeDetails = () => {
   const {animeId} = useParams()
   const navigate = useNavigate()
   const [animeDetails, setAnimeDetails] = useState(null)
   const [episodeList, setEpisodeList] = useState([])
   const [currentPage, setCurrentPage] = useState(1)
   const episodePerPage = 100
   
   PageTitle(animeDetails?.animeTitle || "Loading...")
   const apiRequest = async () => {
      await axios.get(`https://gogoanime.consumet.stream/anime-details/${animeId}`)
            .then(res => {
               setAnimeDetails(res.data)
               setEpisodeList(res.data.episodesList.reverse())
            }).catch(() => navigate("/sss"))
   }

   useEffect(() => {
      apiRequest()
      
   }, [animeId])

   /*          100                1           100     */
   const lastEpisodeIndex = currentPage * episodePerPage
   /*          0                   100                100 */
   const firstEpisodeIndex = lastEpisodeIndex - episodePerPage
   /*   episodes from 0-99                         0                 100   */
   const currentEpisodes = episodeList.slice(firstEpisodeIndex, lastEpisodeIndex)

   if(!animeDetails){
      return(
      <section className='anime-details-wrapper'>
         <div className="loading-wrapper">
            <RiseLoader color="#ffffff" />
         </div>
      </section>
      )
   }
   return (
      <section className='anime-details-wrapper'>
         <div style={{backgroundImage: `url(${animeDetails.animeImg})`}} className="anime-banner">
         </div>
         <div className="header-wrapper">
            <div className="anime-details-header">
               <div className="anime-poster">
                  <img src={animeDetails.animeImg} alt={animeDetails.animeTitle} />
               </div>
               <div className="anime-details-content">
                  <h1>{animeDetails.animeTitle}</h1>
                  <p>{animeDetails.synopsis}</p>
               </div>
            </div>
         </div>
         <div className="inner-container">
            <div className="inner-content">
               <div className="row-data">
                  <p className="row-title">Title</p>
                  <p className="item">{animeDetails.type}</p>
               </div>
               <div className="row-data">
                  <p className="row-title">Other Titles</p>
                  <p className="item">{animeDetails.otherNames.split(",").join(",\n")}</p>
               </div>
               <div className="row-data">
                  <p className="row-title">Released Date</p>
                  <p className="item">{animeDetails.releasedDate}</p>
               </div>
               <div className="row-data">
                  <p className="row-title">Status</p>
                  <p className="item">{animeDetails.status}</p>
               </div>
               <div className="row-data">
                  <p className="row-title">Genres</p>
                  <p className="item">{animeDetails.genres.join(", ")}</p>
               </div>
            </div>
            <div className="episode-grid">
            <Pagination 
               totalEpisode={episodeList.length} 
               episodePerPage={episodePerPage} 
               setCurrentPage={setCurrentPage}
               lastEpisode={episodeList[episodeList.length-1]?.episodeNum}
            />
               { currentEpisodes.length > 0 ? currentEpisodes.map((episode, index) => {
                  return(
                     <Link to={`/watch/${episode.episodeId}`} key={index} className="episode-card">
                        <div className="episode-poster">
                        <img src={animeDetails.animeImg} className="episode-poster" alt={animeDetails.episodeNum} />
                        </div>
                        {episode.episodeNum && <span>Episode: {episode.episodeNum}</span>}
                     </Link>
                  ) 
               }) :
               <div>
                  No episodes available.
               </div>
            }
            </div>
         </div>

      </section>
   )
}