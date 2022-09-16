import React, {FC} from 'react'
import styled from "@emotion/styled";

import {Contact} from "../../common/interfaces/contact.interface";
import ContactsGridItem from "./contactsGridItem/contactsGridItem.component";

interface ContactsGridProps{
    contacts: Contact[]
}

const ContactsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  height: 40rem;
  overflow: auto;
  box-shadow: inset 0 0 10px 1px rgb(0 0 0 / 0.10);

`

const ContactsGrid:FC<ContactsGridProps> = ({contacts} : ContactsGridProps)=> {
    return(
        <ContactsWrapper>
            {contacts.map(c=>(
                <div key={c.id}>
                    <ContactsGridItem contact={c}/>
                </div>
            ))}
        </ContactsWrapper>
    )
}

export default ContactsGrid;