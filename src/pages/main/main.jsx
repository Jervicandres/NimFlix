import React from 'react'
import { AnimeCard } from '../../components/animecard/AnimeCard'
import { HeroBanner } from '../../components/hero-banner/HeroBanner'

export const Main = () => {

   return (
      <>
         <HeroBanner/>
         <AnimeCard 
         category="recent-release"
         />

         <AnimeCard 
         category="popular"
         />

         <AnimeCard 
         category="anime-movies"
         />
      </>
   )
}