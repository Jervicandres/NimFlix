import React from 'react'
import { MdLeaderboard, MdNewReleases } from 'react-icons/md'
import { BiTrendingUp } from 'react-icons/bi'
import { FaSearch } from 'react-icons/fa'
const getCategory = name => {
   switch(name){
      case "recent-episodes":
         return <>
            <MdNewReleases color='CD5888'/> Recent Episodes
            </>
      case "popular":
         return <>
            <MdLeaderboard color='CD5888'/> Popular Anime
            </>
      case "trending":
         return <>
            <BiTrendingUp color='CD5888'/> Trending
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