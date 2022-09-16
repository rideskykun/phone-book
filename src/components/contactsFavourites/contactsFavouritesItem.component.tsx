import React, {FC, useContext} from "react";
import {Contact} from "../../common/interfaces/contact.interface";
import styled from "@emotion/styled";
import FavouritesContext, {FavContextType} from "../../common/contexts/favouritesList.context";

const FavItem = styled.div`
  border: 1px solid gray;
  border-radius: 0.3rem;
  height: 7.5rem;
  width: 9rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  overflow: hidden;

  div {
    padding: 0.5rem;
    overflow: hidden;
    //white-space: nowrap;
    text-overflow: ellipsis;
    width: 8rem;
  }

  button {
    width: 100%;
    padding: 0.5rem 0;
    border: 0;
    border-top: 1px solid gray;

    :hover {
      cursor: pointer;
      background-color: #d3d3d3;
    }

    :active {
      background-color: #a8a8a8;
    }
  }
`

const ContactsFavouritesItem:FC<{contact: Contact}> = ({contact} : { contact:Contact }) => {
    const {removeFavourite} = useContext(FavouritesContext) as FavContextType

    return (
        <FavItem>
            <div>
                <p>{`${contact.first_name} ${contact.last_name}`}</p>
                <p>{contact.phones.length>0? contact.phones[0].number : '-'}</p>
                <h6>{contact.phones.length>1? `and ${contact.phones.length-1} more`:null}</h6>
            </div>

            <button onClick={()=>removeFavourite(contact.id)}>Remove</button>
        </FavItem>
    )
}

export default ContactsFavouritesItem