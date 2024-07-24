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
         var apiURL = `https://api-consumet-o1ty.vercel.app/meta/anilist/${category || keyword}`
         const apiParameter = { page: page,perPage: categoryId ? 20: 10, provider: "gogoanime" }
         const searchParameter = { page: page}

         await axios.get(apiURL, {params: category ? apiParameter : searchParameter})
         .then(({data}) => {
            console.log(data.results, category,categoryId)
            setAnimeData(data.results)
         })
         .catch(error => {
            navigate(`/${error}`)
         })
         .finally(()=>setLoading(false))

         if(isNaN(page) || isNaN(subType)){
            navigate(`/category/${category}`)
         }
      }
      setLoading(true)
      apiRequest()

   }, [categoryId,keyword,page,subType, category, navigate])

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
               animeList.map((anime, index) => {
                  let airSched = new Date(anime?.airingAt)
                  const infoLink = `/details/${anime?.id}`
                  return (
                     <div className='anime-card' key={index}>
                     <Link to={infoLink} className="img-container">
                        <img src={ anime?.image || "https://placeholder.com/assets/images/150x150-2-500x500.png"} alt={anime.title?.userPreferred}/>
                     </Link>
                        <Link to={infoLink} className='episode' >
                           {anime.releaseDate ? `Released: ${anime.releaseDate}` : anime?.episodeNumber ? "Episode: " + anime?.episodeNumber :  "Upcoming"}
                        </Link>
                        {/* {anime.airingAt && <p className='subordub'>{airSched}</p>} */}
                     <Link to={infoLink} className='title' >
                        {anime.title?.userPreferred || anime.title?.english || anime.title?.romaji}
                     </Link>
                  </div>)
            }) :
            <RiseLoader className="preloader" color="#FFF"/>
            }
            {((categoryId || keyword) && animeData.length>0 && !isLoading) &&
            <div className='pagination'>
               
            </div>
            }
         </div>
         
      </section>
   )
}