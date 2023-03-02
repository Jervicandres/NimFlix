import React from 'react'
import { useParams } from 'react-router-dom'
import { AnimeCard } from '../../components/animecard/AnimeCard'
import './animelist.css'

export const AnimeList = () => {
   const {categoryId} = useParams()

   return (
      <div className="page-wrapper">
         <AnimeCard category={categoryId}/>
      </div>
   )
}