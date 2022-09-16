import React, {createContext, useEffect, useState} from "react";
import {Contact} from "../interfaces/contact.interface";

export type FavContextType = {
    favourites: Contact[];
    addFavourite: (contact: Contact) => void;
    removeFavourite: (id: number) => void;
}

type FavProviderProps = {
    children: React.ReactNode
}

const FavouritesContext = createContext<FavContextType | null>(null)

export const FavouritesProvider = (props: FavProviderProps) => {
    const [favourites, setFavourites] = useState<Contact[]>(
        localStorage.getItem('favourites')?
            JSON.parse(localStorage.getItem('favourites') || '')
            :
            []
    )
    const addFavourite = (contact: Contact) => {
        if(favourites.length>3) alert('Cannot add more favourites')
        else setFavourites([...favourites, contact])
    }
    const removeFavourite = (id: number) => {
        setFavourites(favourites.filter(f => f.id !== id))
    }

    useEffect(()=>{
        localStorage.setItem('favourites', JSON.stringify(favourites))
    },[favourites])

    return <FavouritesContext.Provider value={{ favourites, addFavourite, removeFavourite }}>{props.children}</FavouritesContext.Provider>
}

export default FavouritesContext