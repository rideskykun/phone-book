import React, {FC} from 'react'
import {useGetContactDetails} from "../../hooks/contacts/useGetContactDetails";
import ContactsGridItem from "../contactsGrid/contactsGridItem/contactsGridItem.component";

interface ContactEditProps {
    id?: number
}

const ContactsEdit:FC<ContactEditProps> = ({id} : ContactEditProps) => {

    const editedContact = useGetContactDetails(id?id:0, !id)


    return (
        <>
            <h3>Edit Contact {id}</h3>
            Current Data
            {editedContact?
                <ContactsGridItem contact={editedContact}/>
                :null
            }
        </>
    )
}

export default ContactsEdit