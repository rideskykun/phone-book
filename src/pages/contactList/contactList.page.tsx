import React, {FC} from 'react'
import ContactsGrid from "../../components/contactsGrid/contactsGrid.component";
import {useGetContacts} from "../../hooks/contacts/useGetContacts";

const ContactList:FC = ()=> {

    const contacts = useGetContacts(1, [1570])

    return(
        <>
            Contact List

            <ContactsGrid contacts={contacts || []}/>
        </>
    )
}

export default ContactList