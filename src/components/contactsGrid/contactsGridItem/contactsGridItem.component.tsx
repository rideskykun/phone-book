import React, {FC} from 'react'

import {Contact} from "../../../common/interfaces/contact.interface";

const ContactsGridItem:FC<{contact: Contact}> = ({contact} : { contact:Contact }) => {
    return(
        <div>
            <p>ID : {contact.id}</p>
            <p>Name : {contact.first_name}</p>
        </div>
    )
}

export default ContactsGridItem;