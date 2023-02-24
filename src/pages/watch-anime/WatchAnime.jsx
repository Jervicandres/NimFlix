import React, { useEffect, useState } from 'react'
import './watchanime.css'
import { useNavigate, useParams } from 'react-router-dom'
import axios from "axios"
import { EpisodeDetails } from '../../components/episode-details/EpisodeDetails'
import { MoonLoader } from 'react-spinners'

export const WatchAnime = () => {
   const {episodeId} = useParams()
   const navigate = useNavigate()
   const [episodeRef, setEpisodeRef] = useState("")
   const loadEpisodeRef = async () => {
         await axios.get(`https://gogoanime.consumet.stream/vidcdn/watch/${episodeId}`)
         .then(res => {
            setEpisodeRef(res.data.Referer)
            if(res.data.error)
            {
               navigate("/404")
            }
         })
   }

   useEffect(() => {
         loadEpisodeRef()
   }, [episodeId])
   
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
            { episodeRef ? <>
            <h1 style={{fontSize: "1rem", padding: "0.5rem"}}>{episodeId.toLocaleUpperCase().replace(/-/g, " ")}</h1>
            <iframe 
            title={episodeId} 
            src={episodeRef}
            frameBorder="0"
            className="video-player"
            allowFullScreen
            scrolling='no'
            ></iframe></>:
            <div className='video-preloader'>
               <MoonLoader color="#FFF" />
            </div>
            }
         </div>
            <EpisodeDetails episodeId={episodeId} currentEpisode={episodeId.slice(-2).replace("-", "")}/>
      </section>
   )
}