import { createContext, useState } from "react";

const ContactContext = createContext(undefined)

export function ContactProvider({children}){
    const [favourites, setFavourites] = useState([])
    const addFavourite = (contact) => {
        setFavourites([...favourites, contact])
    }
    const removeFavourite = (id) => {
        setFavourites(favourites.filter(f => f.id !== id))
    }

    return <ContactContext.Provider value={{ favourites, addFavourite, removeFavourite }}>{children}</ContactContext.Provider>
}

export default ContactContext