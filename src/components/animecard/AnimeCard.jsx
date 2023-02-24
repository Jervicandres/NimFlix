import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {AiOutlineArrowRight} from 'react-icons/ai'
import './animecard.css'
import axios from "axios"
import { RiseLoader } from 'react-spinners'
import { ListName } from './ListName'

export const AnimeCard = ({category, keyword = null}) => {
   const [animeData, setAnimeData] = useState([])
   const navigate = useNavigate()
   const {categoryId, page = 1, subType = 1} = useParams()
   const [pagination, setPagination] = useState([])

   const apiRequest = async () => {
      if(category){
         await axios.get(`https://gogoanime.consumet.stream/${category}`, {params: {page: page, type: subType}})
         .then(res => {
            setAnimeData(res.data)
         })
         .catch(error => {
            navigate(`/${error}`)
         })
      }
      else if(keyword){
         await axios.get(`https://gogoanime.consumet.stream/search?keyw=${keyword}`, {params: {page: page}})
         .then(res => {
            setAnimeData(res.data)
         })
         .catch(error => {
            navigate(`/${error}`)
         })
      }
      
      if(isNaN(page) || isNaN(subType)){
         navigate(`/category/${category}`)
      }
      else if(categoryId || keyword && animeData.length > 0){
         setPagination([])
         let currentPage = Number(page)
         for(let nextPage=currentPage;nextPage<currentPage+3;nextPage++)
         {  
            if(nextPage+1>2 && nextPage === currentPage)
            {
               for(let prevPage=currentPage-2;prevPage<=currentPage;prevPage++)
               {  prevPage !== 0 &&
                  setPagination(prev => [...prev,prevPage])
               }
            }
            else{
               setPagination(prev => [...prev,nextPage])
            }
         }
      }
   }

   useEffect(() => {
      apiRequest()
   }, [categoryId,keyword,page,subType])

   const animeList = animeData

   if(keyword && animeData.length===0){
      return(
         
      <section className='animelist-wrapper'>
         <div className='animelist-container'>
         <div className='animelist-category'>
               <h2><ListName category={category || keyword}/></h2>
               {!keyword &&<Link to={`/category/${category}`} className='category-link'>View All <AiOutlineArrowRight/></Link>}
            <h3>No results found.</h3>
         </div>
         </div>
      </section>
      )
   }

   return(
      <section className='animelist-wrapper'>
         <div className='animelist-container'>
            {!categoryId && 
            <div className='animelist-category'>
               <h2><ListName category={category || keyword}/></h2>
               {!keyword &&<Link to={`/category/${category}`} className='category-link'>View All <AiOutlineArrowRight/></Link>}
            </div>}
            {
               animeList.length>0 &&
               animeList.slice(0,categoryId || keyword ? 20 : 10).map((anime, index) => {
                  const episodeLink = `/watch/${anime?.episodeId}`
                  const infoLink = `/details/${anime?.animeId}`
                  return (
                     <div className='anime-card' key={index}>
                     <Link to={anime.episodeId ? episodeLink : infoLink} className="img-container">
                        <img src={anime.animeImg ? anime.animeImg : "https://placeholder.com/assets/images/150x150-2-500x500.png"} alt={anime.animeTitle}/>
                     </Link>
                     { 
                        anime.episodeId ?
                        <Link to={episodeLink} className='episode' >
                           {`Episode ${anime?.episodeNum || "Loading..."}`}
                        </Link> :
                        <Link to={infoLink} className='episode' >
                           {anime.releasedDate ? `Released ${anime.releasedDate}` : anime.status ? anime.status : "Upcoming"}
                        </Link>
                     }
                     {anime.subOrDub && <p className='subordub'>{anime.subOrDub}</p>}
                     <Link to={anime.episodeId ? episodeLink : infoLink} className='title' >
                        {anime.animeTitle}
                     </Link>
                  </div>)
            })
            }
            {(categoryId || keyword && animeData.length>0) &&
            <div className='pagination'>
               {
                  pagination.map((link, index) => {
                        return <Link key={index} to={category ? `/category/${category}/${link}` : `/search/${keyword}/${link}`} className={`page-btn ${link == page ? "active" : ""}`}>
                              {link}
                              </Link>
                  })
               }
            </div>
            }
         </div>
         
      </section>
   )
}