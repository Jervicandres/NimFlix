import React from 'react'
import { useParams } from 'react-router-dom'
import { AnimeCard } from '../../components/animecard/AnimeCard'
import "./searchresult.css"

export const SearchResult = () => {
   const {keyword} = useParams()

  return <div style={{minHeight: "100vh"}}>
          <AnimeCard keyword={keyword} />
        </div>
}
