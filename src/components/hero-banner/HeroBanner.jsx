import React, { useEffect, useState } from 'react'
import './HeroBanner.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {FaPlay} from 'react-icons/fa'
import {BiDetail} from 'react-icons/bi'
import { RiseLoader } from 'react-spinners'

export const HeroBanner = () => {
  const [animeSlide, setAnimeSlide] = useState(null)
  const [animeIndex, setAnimeIndex] = useState(0)
  const [startSlide, setStartSlide] = useState(false)

  const apiRequest = async () => {
    await axios.get(`https://gogoanime.consumet.stream/top-airing`)
    .then(res => setAnimeSlide(res.data))
    animeSlide && setStartSlide(true)
  }
  useEffect(() => {
    apiRequest()
    const interval = setInterval(()=>{
          setAnimeIndex(pre=> pre+1)
        },5000)

    if(animeIndex===10){
      clearInterval(interval)
      setAnimeIndex(0)
    }

    return () => clearInterval(interval)
  }, [])

  return (
    <section className='hero-section'>
        { 
        animeSlide ?
        animeSlide.slice(0,10).map(({animeId,animeImg,animeTitle, latestEp},index) => {
          return(
            <div style={{ backgroundImage: `url(${animeImg})`}} key={index} className={`hero-banner ${animeIndex === index ? 'active' : ''}`}>
                <div className="hero-details">
                  <h4 style={{color: "var(--color-primary)"}}>#{animeIndex+1} TOP AIRING</h4>
                  <Link to={`/details/${animeId}`} className='hero-title'>{animeTitle}</Link>
                  <div className="hero-button-container">
                    <Link to={`/watch/${animeId.concat("-",latestEp.replace(" ","-")).toLowerCase()}`} className="hero-button watch"><FaPlay/> Watch Now</Link>
                    <Link to={`/details/${animeId}`} className="hero-button"><BiDetail/> View Details</Link>
                  </div>
                </div>
                
                <div className="hero-img-container">
                  <img src={animeImg} className="hero-img" alt="sample" />
                </div>
            </div>
          )
        }) :
        <div className="banner-preloader">
          <RiseLoader color="#ffffff" />
        </div>
        }
    </section>
  )
}
