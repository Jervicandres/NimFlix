import React, { useState } from 'react'
import './animesearch.css'
import {BsSearch} from 'react-icons/bs'
import {Link, useNavigate} from "react-router-dom"

const isEmpty = (word) =>{
   return word.replace(/\s/g, "").length <= 0
}

export const AnimeSearch = ({placeholder, data, setSearchAnime }) => {
   const [isFocus, setIsFocus] = useState(false)
   const [keyword, setKeyword] = useState("")
   const navigate = useNavigate()
   document.body.addEventListener('click', (event) => {
      if(event.target.className != 'search-box'){
         setIsFocus(false);
      }
      else if (event.target.value.className == 'anime-result' || event.target.value.className == 'search-result')
      {
         setIsFocus(true);
      }
   }); 
   return (
      <div className='search-box-container'>
         <input 
         type="text" 
         className="search-box" 
         onFocus={() => {
            setIsFocus(true)
            console.log(isFocus)
         }} 
         onChange={(e) => {
            setSearchAnime(e.target.value)
            setKeyword(e.target.value)
         }} 
         onKeyDown={e => {
            if(e.key === "Enter" && !isEmpty(keyword))
            navigate(`/search/${keyword}`)
         }}
         placeholder={placeholder}
         />

         <Link 
         to={`/search/${keyword}`} 
         className='search-button' 
         onClick={e => isEmpty(keyword) && e.preventDefault()}>
            <BsSearch/>
         </Link>

         {(keyword) &&
         <div className='search-result' style={{display: isFocus ? 'block': 'none'}}>
            {(data?.length > 0) ? data.slice(0,5).map((anime, key) => {
               return(
                  <Link to={`/details/${anime.id}`} className='anime-result' key={key}>
                     <img src={anime.image} alt={anime.id} width="60" height="90" />
                     <div className="anime-info">
                        
                        <p className='title'>{anime.title?.english || anime.title?.userPreferred}</p>
                        <p className='status'>{anime.status}</p>
                     </div>
                  </Link>
               ) 
            }):
            <p className="anime-result">
               No results found.
            </p>
         }
         </div>
         }
      </div>
   )
}