import React from 'react'
import { MdLeaderboard, MdNewReleases } from 'react-icons/md'
import { RiMovie2Fill } from 'react-icons/ri'


export const ListName = ({category}) => {
   switch(category){
      case "recent-release":
         return (<div className='category-section'><MdNewReleases color='CD5888'/>Recent Episodes</div>)
      case "popular":
         return (<div className='category-section'><MdLeaderboard color='CD5888'/>Popular Anime</div>)
      case "anime-movies":
         return (<div className='category-section'><RiMovie2Fill color='CD5888'/>Anime Movies</div>)
      default:
         return <div className="category-section">Results For: {category}</div>
   }
}