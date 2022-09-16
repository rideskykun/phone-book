import React, {FC} from 'react'
import ContactsFavouritesItem from "./contactsFavouritesItem/contactsFavouritesItem.component";
import {Contact} from "../../common/interfaces/contact.interface";
import styled from "@emotion/styled";

interface ContactsFavouritesProps{
    favourites: Contact[]
}

const FavGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 0 3rem;
  gap: 1rem;
  width: 100%;
`

const ContactsFavourites:FC<ContactsFavouritesProps> = ({favourites} : ContactsFavouritesProps) => {
    return(
        <FavGrid>
            {favourites.map(f=>(
                <div>
                    <ContactsFavouritesItem contact={f}/>
                </div>
            ))}
        </FavGrid>
    )
}

export default  ContactsFavourites