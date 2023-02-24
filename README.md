# NimFlix

Watch anime online without ads.
Developed using ReactJS, Vanilla CSS, and [Consumet API](https://docs.consumet.org).

## Why I built this app?

Because I wanted to practice Flexbox and CSS Grid in making a responsive list grid with less media query.
I also built this app to improve my knowledge in using React Hooks(useState,useEffect, customHooks,useRef,useContext,useReducer). I didn't use some of the React Hooks I learned (useReducer and useContext) because I I don't think it is necessary to use it here.

## Bugs?

After you typed in the search bar, you have to click the search bar twice to close the suggestion. I tried using onBlur but the suggestion would close right before you click the link.
Pagination doesn't have limit. If there are 2 pages, there would still be 3 pagination button.
