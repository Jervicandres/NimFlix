import React from 'react'
import {MdNewReleases, MdLeaderboard} from 'react-icons/md'
import {RiMovie2Fill} from 'react-icons/ri'
import { useParams } from 'react-router-dom'
import { AnimeCard } from '../../components/animecard/AnimeCard'
import './animelist.css'

export const AnimeList = () => {
   const {categoryId} = useParams()
   
   const setCategory = () => {
      switch(categoryId){
         case "recent-release":
            return <h2 className="category-name"><MdNewReleases color='CD5888'/> Recent Release</h2>
         case "popular":
            return <h2 className="category-name"><MdLeaderboard color='CD5888'/> Popular Anime</h2>
         case "anime-movies":
            return <h2 className="category-name"><RiMovie2Fill color='CD5888'/> Anime Movies</h2>
      }
   }

   return (
      <div className="page-wrapper">
         {setCategory()}
         <AnimeCard category={categoryId}/>
      </div>
   )
}