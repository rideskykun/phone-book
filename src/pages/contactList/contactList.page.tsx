import React, {FC, useEffect, useState} from 'react'
import ContactsGrid from "../../components/contactsGrid/contactsGrid.component";
import {useGetContacts} from "../../hooks/contacts/useGetContacts";
import {useNavigate, useParams} from "react-router-dom";
import styled from "@emotion/styled";

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  margin-top: 1rem;
`

const PaginationButtons = styled.div`
  display: flex;
  gap: 0.5rem;

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
        <>
            <h3>Contact List</h3>

            <ContactsGrid contacts={contacts || []}/>

            <PaginationWrapper>
                Page {page}

                <PaginationButtons>
                    <button onClick={()=>navigate(`../${page-1}`)} disabled={page<2}>Prev</button>
                    <button onClick={()=>navigate(`../${page+1}`)} disabled={contacts?contacts.length<10 : true}>Next</button>
                </PaginationButtons>
            </PaginationWrapper>
        </>
    )
}

export default ContactList