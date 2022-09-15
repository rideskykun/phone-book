import React, {FC} from 'react'
import {useParams} from "react-router-dom";

import ContactForm from "../../components/contactsForm/contactForm.component";


const ContactAddEdit:FC = ()=> {
    const { id } = useParams()
    const isAddNew = !id

    return(
        <>
            Contact Form

            <div>
                {isAddNew?
                    'Add New Contact'
                    :
                    `Edit Contact ID ${id}`
                }
            </div>

            <ContactForm/>
        </>
    )
}

export default ContactAddEdit