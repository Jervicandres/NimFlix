import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { Main } from './pages/main/main'
import { WatchAnime } from './pages/watch-anime/WatchAnime'
import { AnimeDetails } from './pages/anime-details/AnimeDetails'
import { Navbar } from './components/navbar/navbar'
import { NotFound } from './pages/error/NotFound'
import { AnimeList } from './pages/animelist/AnimeList'
import { ScrollToTop } from './components/ScrollToTop'
import {SearchResult} from './pages/search-result/SearchResult'
import { Footer } from './components/footer/Footer'

export const App = () => {

   return (
      <div className='App'>
         <Router>
            <ScrollToTop />
            <Navbar />
            <Routes>
               <Route path='/' element={<Main/>} />
               <Route path='/category/:categoryId/:page?/:subType?' element={<AnimeList/>} />
               <Route path='/watch/:episodeId' element={<WatchAnime/>} />
               <Route path='/details/:animeId' element={<AnimeDetails/>} />
               <Route path='/search/:keyword/:page?' element={<SearchResult/>} />
               <Route path='*' element={<NotFound/>} />
            </Routes>
            <Footer/>
         </Router>
      </div>
   )
}
