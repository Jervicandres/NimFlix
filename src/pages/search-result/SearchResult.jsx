import React from 'react'
import { useParams } from 'react-router-dom'
import { AnimeCard } from '../../components/animecard/AnimeCard'
import { PageTitle } from '../../components/page-title/PageTitle'
import "./searchresult.css"

export const SearchResult = () => {
   const {keyword} = useParams()
        PageTitle("Search: " + keyword)
  return <div style={{minHeight: "100vh"}}>
          <AnimeCard keyword={keyword} />
        </div>
}
