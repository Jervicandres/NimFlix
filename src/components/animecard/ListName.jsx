import React from 'react'
import { MdLeaderboard, MdNewReleases } from 'react-icons/md'
import { RiMovie2Fill } from 'react-icons/ri'
import { FaSearch } from 'react-icons/fa'
const getCategory = name => {
   switch(name){
      case "recent-release":
         return <>
            <MdNewReleases color='CD5888'/> Recent Release
            </>
      case "popular":
         return <>
            <MdLeaderboard color='CD5888'/> Popular Anime
            </>
      case "anime-movies":
         return <>
            <RiMovie2Fill color='CD5888'/> Anime Movies
            </>
      default: 
         return <>
         <FaSearch color='CD5888'/> Search: {name}
         </>
   }
}

export const ListName = ({category}) => {
   const categoryName = getCategory(category)
   
   return <h2 className='category-section' style={{marginTop: "1rem"}}>
      {categoryName}
   </h2>
}