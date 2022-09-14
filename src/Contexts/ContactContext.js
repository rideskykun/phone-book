import {createContext, useEffect, useState} from "react";

const ContactContext = createContext(undefined)

export function ContactProvider({children}){
    const [favourites, setFavourites] = useState(
        localStorage.getItem('favourites')?
            JSON.parse(localStorage.getItem('favourites'))
            :
            []
    )
    const addFavourite = (contact) => {
        setFavourites([...favourites, contact])
    }
    const removeFavourite = (id) => {
        setFavourites(favourites.filter(f => f.id !== id))
    }

    useEffect(()=>{
        localStorage.setItem('favourites', JSON.stringify(favourites))
    },[favourites])

    return <ContactContext.Provider value={{ favourites, addFavourite, removeFavourite }}>{children}</ContactContext.Provider>
}

export default ContactContext