import React, {FC, useContext} from 'react'
import styled from "@emotion/styled";

import {Contact} from "../../../common/interfaces/contact.interface";
import FavouritesContext, {FavContextType} from "../../../common/contexts/favouritesList.context";
import {useDeleteContact} from "../../../hooks/contacts/useDeleteContact";
import {useNavigate} from "react-router-dom";

const ContactCard = styled.div`
  width: 100%;
  border: 1px solid #c9c9c9;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: center;
  border-radius: 0.25rem;
  box-shadow: 0 0 10px 1px rgb(0 0 0 / 0.1);
  overflow: hidden;

  div {
    width: 25%;
  }

  p {
    padding: 1rem;
    width: 30%;
    white-space: normal;
  }

  ul {
    padding: 1rem;
    width: 45%;
  }
`

const ItemActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.2rem;
  align-items: center;
  padding-right: 1rem;

  button {
    height: 2rem;
    width: 2rem;
    font-size: 1rem;
    background: 0;
    border: 0;
    color: #5e5e5e;
    border-radius: 0.25rem;
    transition: 0.3s;
    
    :hover{
      cursor: pointer;
    }
  }
`

const FavButton = styled.button`
  :hover {
    color: #bdbd00;
    background: rgba(255, 255, 0, 0.06);
    border: 1px solid yellow;
  }
`

const DelButton = styled.button`
  :hover {
    color: red;
    background: rgba(255, 0, 0, 0.06);
    border: 1px solid red;
  }
`

const ContactsGridItem:FC<{contact: Contact}> = ({contact} : { contact:Contact }) => {

    //Hooks
    const {addFavourite} = useContext(FavouritesContext) as FavContextType
    const deleteContact = useDeleteContact()
    const navigate = useNavigate()

    //Functions
    const handleDeleteContact = () => {
        if(window.confirm('Are you sure you want to delete contact?')){
            deleteContact({
                variables:{
                    id: contact.id
                }
            })

            navigate('/status/success')
        }
    }

    return(
        <ContactCard>
            {/*<p>ID : {contact.id}</p>*/}
            <p>{`${contact.first_name} ${contact.last_name}`}</p>
            <ul>
                {contact.phones.map(p => (
                    <li>{p.number}</li>
                ))}
            </ul>
            <ItemActions>
                <FavButton
                    onClick={()=>addFavourite(contact)}
                >&#9733;</FavButton>
                <DelButton
                    onClick={()=>handleDeleteContact()}
                >&#10005;</DelButton>
            </ItemActions>
        </ContactCard>
    )
}

export default ContactsGridItem;