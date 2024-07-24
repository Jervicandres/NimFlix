import React, { useEffect, useState } from 'react'
import './watchanime.css'
import { useNavigate, useParams } from 'react-router-dom'
import axios from "axios"
import { EpisodeDetails } from '../../components/episode-details/EpisodeDetails'
import { MoonLoader } from 'react-spinners'

export const WatchAnime = () => {
   const {animeId, episodeId} = useParams()
   const navigate = useNavigate()
   const [episodeRef, setEpisodeRef] = useState("")
   const [isLoading, setLoading] = useState(false)

   useEffect(() => {
      setLoading(true)
      const loadEpisodeRef = async () => {
         await axios.get(`https://api-consumet-o1ty.vercel.app/meta/anilist/watch/${episodeId}`)
         .then(({data}) => {
            setEpisodeRef(data.headers.Referer)
            console.log(data.sources[0].url)
         })
         .catch(error=> navigate(`/${error}`))
         .finally(()=> setLoading(false))
      }
      loadEpisodeRef()
   }, [episodeId,navigate])
   
   if(!episodeRef){
      return <section className='episode-wrapper'>
         <div className='video-preloader'>
               <MoonLoader color="#FFF" />
         </div>
      </section>
   }
   return (
      <section className='episode-wrapper'>
         <div className="video-container">
            { (episodeRef && !isLoading) ? <>
            <h1 style={{fontSize: "1rem", padding: "0.5rem", marginTop: "1.5rem"}}>{episodeId.toLocaleUpperCase().replace(/-/g, " ")}</h1>
            <iframe 
            title={episodeId} 
            src={episodeRef}
            frameBorder="0"
            className="video-player"
            allowFullScreen
            scrolling='no'
            type="application/x-mpegURL"
            ></iframe></>:
            <div className='video-preloader'>
               <MoonLoader color="#FFF" />
            </div>
            }
         </div>
         <EpisodeDetails currentEpisode={episodeId} animeId={animeId}/>
      </section>
   )
}