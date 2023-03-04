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
   const animeURL = `https://api.consumet.org/meta/anilist/info/${animeId}`
   
   PageTitle(animeDetails?.title.english || "Loading...")
   

   useEffect(() => {
      const apiRequest = async () => {
         await axios.get(animeURL)
               .then(res => {
                  console.log(res.data)
                  setAnimeDetails(res.data)
                  setEpisodeList(res.data.episodes)
               }).catch(error => navigate(`/${error}`))
      }
      apiRequest()
   }, [animeURL,navigate])

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
         <div style={{backgroundImage: `url(${animeDetails.cover})`}} className="anime-banner">
         </div>
         <div className="header-wrapper">
            <div className="anime-details-header">
               <div className="anime-poster">
                  <img src={animeDetails.image} alt={animeDetails.title} />
               </div>
               <div className="anime-details-content">
                  <h1>{animeDetails.title.english}</h1>
                  <p>{animeDetails.description}</p>
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
                  <p className="item">
                     {animeDetails.title.native},<br/>
                     {animeDetails.title.english},<br/>
                     {animeDetails.title.romaji}
                  </p>
               </div>
               <div className="row-data">
                  <p className="row-title">Released Date</p>
                  <p className="item">{animeDetails.releaseDate}</p>
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
               lastEpisode={episodeList[episodeList.length-1]?.number}
            />
               { currentEpisodes.length > 0 ? currentEpisodes.map((episode, index) => {
                  return(
                     <Link to={`/watch/${animeId}/${episode.id}`} key={index} className="episode-card">
                        <div className="episode-poster">
                        <img src={episode.image} className="episode-poster" alt={animeDetails.number} />
                        </div>
                        {episode.number && <span>Episode: {episode.number}</span>}
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