import { useEffect,useRef } from 'react'

export const PageTitle = (title, prevailOnUnmount = false) => {
   const defaultTitle = useRef(document.title)
   
   useEffect(() => {
      document.title = title
   }, [title])

   useEffect(() => () => {
      if(!prevailOnUnmount)
      document.title = defaultTitle.current
   },[prevailOnUnmount])
}