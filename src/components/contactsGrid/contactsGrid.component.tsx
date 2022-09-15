import React, {FC} from 'react'

import {Contact} from "../../common/interfaces/contact.interface";
import ContactsGridItem from "./contactsGridItem/contactsGridItem.component";

interface ContactsGridProps{
    contacts: Contact[]
}

const ContactsGrid:FC<ContactsGridProps> = ({contacts} : ContactsGridProps)=> {
    return(
        <div>
            {contacts.map(c=>(
                <div key={c.id}>
                    <ContactsGridItem contact={c}/>
                </div>
            ))}
        </div>
    )
}

export default ContactsGrid;