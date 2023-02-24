import React from 'react'

export const Pagination = ({totalEpisode, episodePerPage, setCurrentPage, lastEpisode}) => {
   let pages = []

   for(let i = 1; i<= Math.ceil(totalEpisode/episodePerPage); i++){
      pages.push(i)
   }

   return (
      <div className='episode-page'>
         {
         pages.map((page, index) => {
            return <button key={index} onClick={() => setCurrentPage(page)}>{`${index*episodePerPage+1} - ${pages.length === index+1 ? lastEpisode : page*episodePerPage}`}</button>
         })
         }
      </div>
   )
}