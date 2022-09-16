import React, {FC, useEffect, useState} from 'react'
import ContactsGrid from "../../components/contactsGrid/contactsGrid.component";
import {useGetContacts} from "../../hooks/contacts/useGetContacts";
import {useNavigate, useParams} from "react-router-dom";
import styled from "@emotion/styled";
import ContactsFavourites from "../../components/contactsFavourites/contactsFavourites.component";

const ContactListWrapper = styled.div`
  overflow-y: scroll;
  height: 100vh;
  padding-bottom: 6rem;
`

const PaginationButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;

  button {
    padding: 0.25rem 0.5rem;
    border: 1px solid #bdbdbd;
  }
`

const ContactList:FC = ()=> {
    const params = useParams()
    const navigate = useNavigate()
    const [page, setPage] = useState<number>(params.page? Number(params.page) : 1)

    const contacts = useGetContacts(page, [1570])

    useEffect(()=>{
        if(params.page) setPage(Number(params.page))
    },[params])

    return(
        <ContactListWrapper>
            <h3>Favourites</h3>
            <ContactsFavourites favourites={contacts?.slice(0, 4) || []}/>

            <h3>Contact List</h3>

            <ContactsGrid contacts={contacts || []}/>

            <PaginationButtons>
                <button onClick={()=>navigate(`../${page-1}`)} disabled={page<2}>Prev</button>
                {page}
                <button onClick={()=>navigate(`../${page+1}`)} disabled={contacts?contacts.length<10 : true}>Next</button>
            </PaginationButtons>
        </ContactListWrapper>
    )
}

export default ContactList