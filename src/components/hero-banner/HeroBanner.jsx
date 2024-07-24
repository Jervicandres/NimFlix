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

  
  useEffect(() => {
    const apiRequest = async () => {
      await axios.get(`https://api-consumet-o1ty.vercel.app/meta/anilist/trending`)
      .then(res => {
        setAnimeSlide(res.data.results)
        console.log(res.data.results)
      })
      animeSlide && setStartSlide(true)
    }

    !startSlide && apiRequest()
    const interval = setInterval(()=>{
          setAnimeIndex(pre=> pre+1)
        },5000)

    if(animeIndex===10){
      clearInterval(interval)
      setAnimeIndex(0)
    }

    return () => clearInterval(interval)
  }, [animeIndex,animeSlide,startSlide])

  return (
    <section className='hero-section'>
        { 
        animeSlide ?
        animeSlide.map(({id,image,cover,title},index) => {
          return(
            <div style={{ backgroundImage: `url(${cover})`}} key={index} className={`hero-banner ${animeIndex === index ? 'active' : ''}`}>
                <div className="hero-details">
                  <h4 style={{color: "var(--color-primary)"}}>#{animeIndex+1} TRENDING</h4>
                  <Link to={`/details/${id}`} className='hero-title'>{title.english}</Link>
                  <div className="hero-button-container">
                    <Link to={`/details/${id}`} className="hero-button watch"><BiDetail/> View Details</Link>
                  </div>
                </div>
                
                <div className="hero-img-container">
                  <img src={image} className="hero-img" alt="sample" />
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
