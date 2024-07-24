import React, { useEffect, useState } from 'react'
import './navbar.css'
import Logo from '../../assets/favicon32.png'
import { Link } from 'react-router-dom'
import { AnimeSearch } from '../animesearch/AnimeSearch'
import {FaTimes, FaBars} from 'react-icons/fa'
import axios from 'axios'
import { useRef } from 'react'

export const Navbar = () => {
   const navRef = useRef()
   const [navButton, setNavButton] = useState(true)
   const [searchAnime, setSearchAnime] = useState("")
   const [searchResult, setSearchResult] = useState(null)

   useEffect(()=> {
      const searchAnimeTitle = async () => {
         await axios.get(`https://api-consumet-o1ty.vercel.app/meta/anilist/${searchAnime}`)
         .then(({data}) => {
         setSearchResult(data.results)
      })
         
      }
      const timeout = setTimeout(() => {
         searchAnime && searchAnimeTitle()
      }, 1000)
      return () => clearTimeout(timeout)
   }, [searchAnime])

   const toggleNavbar = () => {
      navRef.current.classList.toggle("nav-mobile")
      setNavButton(prev => !prev)
   }

   return (
      <header>
            <Link to='/' className='header-logo'><img src={Logo} alt="NimFlix" /><h1>NimFlix</h1></Link>
         <nav ref={navRef} className='navbar'>
            <AnimeSearch 
            placeholder="Search..." 
            data={searchResult} 
            setSearchAnime={setSearchAnime} 
            />
            
            <div className="nav-links">
            <Link to='/category/popular'>Popular</Link>
            <Link to='/category/recent-episodes'>Recent</Link>
            </div>
         </nav>
         <button onClick={toggleNavbar} className="nav-btn">
            { navButton ? <FaBars /> : <FaTimes />}
         </button>
      </header>
   )
}