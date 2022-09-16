import React, {FC} from 'react'
import {useParams} from "react-router-dom";

import ContactForm from "../../components/contactsForm/contactForm.component";


const ContactAddEdit:FC = ()=> {
    const { id } = useParams()
    const isAddNew = !id

    return(
        <>
            <h3>Add New Contact</h3>

            <ContactForm/>
        </>
    )
}

export default ContactAddEdit