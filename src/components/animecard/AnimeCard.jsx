import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {AiOutlineArrowRight} from 'react-icons/ai'
import './animecard.css'
import axios from "axios"
import { ListName } from './ListName'
import { PageTitle } from '../page-title/PageTitle'
import { RiseLoader } from 'react-spinners'

const capitalize = (str) =>{
   if(str)
   return str.replace(/\b\w/g, (ltr) => ltr.toUpperCase());
   return false
}

export const AnimeCard = ({category, keyword = null}) => {
   const [animeData, setAnimeData] = useState([])
   const navigate = useNavigate()
   const {categoryId, page = 1, subType = 1} = useParams()
   const [pagination, setPagination] = useState([])
   const [isLoading, setLoading] = useState(false)

   PageTitle(capitalize(categoryId?.replace(/-/g," ")) || "NimFlix")

   useEffect(() => {
      const apiRequest = async () => {
         var apiURL = category ? `https://gogoanime.consumet.stream/${category}` : `https://gogoanime.consumet.stream/search?keyw=${keyword}`
         const apiParameter = { page: page, type: subType }
         const searchParameter = { page: page}

         await axios.get(apiURL, {params: category ? apiParameter : searchParameter})
         .then(res => {
            setAnimeData(res.data)
         })
         .catch(error => {
            navigate(`/${error}`)
         })
         .finally(()=>setLoading(false))

         if(isNaN(page) || isNaN(subType)){
            navigate(`/category/${category}`)
         }
         else if((categoryId || keyword) && animeData.length > 0){
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
      setLoading(true)
      apiRequest()

   }, [categoryId,keyword,page,subType,animeData.length, category, navigate])

   const animeList = animeData

   if(keyword && animeData.length===0){
      return(
      <section className='animelist-wrapper'>
         <div className='animelist-container'>
         <div className='animelist-category' >
               <ListName category={category || keyword}/>
               {!keyword &&<Link to={`/category/${category}`} className='category-link'>View All <AiOutlineArrowRight/></Link>}
            {isLoading ? <RiseLoader  className="preloader" color='#FFF'/> : <h3>No results found.</h3>}
         </div>
         </div>
      </section>
      )
   }

   return(
      <section className='animelist-wrapper'>
         <div className='animelist-container'>
            
            <div className='animelist-category'>
               <ListName category={category || keyword}/>
               {(!keyword && !categoryId) && <Link to={`/category/${category}`} className='category-link'>View All <AiOutlineArrowRight/></Link>}
            </div>
            {
               (!isLoading && animeList.length>0) ?
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
            }) :
            <RiseLoader className="preloader" color="#FFF"/>
            }
            {((categoryId || keyword) && animeData.length>0 && !isLoading) &&
            <div className='pagination'>
               {
                  pagination.map((link, index) => {
                        return <Link key={index} to={category ? `/category/${category}/${link}` : `/search/${keyword}/${link}`} className={`page-btn ${link === Number(page) ? "active" : ""}`}>
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