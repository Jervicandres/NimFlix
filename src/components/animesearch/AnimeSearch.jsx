import React, { useState } from 'react'
import './animesearch.css'
import {BsSearch} from 'react-icons/bs'
import {Link} from "react-router-dom"

export const AnimeSearch = ({placeholder, data, setSearchAnime }) => {
   const [isFocus, setIsFocus] = useState(false)
   const [keyword, setKeyword] = useState("")
   return (
      <div className='search-box-container'>
         <input 
         type="text" 
         className="search-box" 
         onFocus={() => setIsFocus(true)} 
         onMouseDown={() => setIsFocus(false)}
         onChange={(e) => {
            setSearchAnime(e.target.value)
            setKeyword(e.target.value)
         }} 
         placeholder={placeholder}
         />
         <Link to={`/search/${keyword}`} className='search-button'><BsSearch/></Link>
         {isFocus &&
         <div className='search-result'>
            {data && data.slice(0,5).map((anime, key) => {
               return(
                  <Link to={`/details/${anime.animeId}`} className='anime-result' key={key}>
                     <img src={anime.animeImg} alt={anime.animeTitle} width="60" height="90" />
                     <div className="anime-info">
                        <p className='title'>{anime.animeTitle}</p>
                        <p className='status'>{anime.status}</p>
                     </div>
                  </Link>
               )
            })}
         </div>
         }
      </div>
   )
}