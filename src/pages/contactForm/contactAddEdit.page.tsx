import React, {FC} from 'react'
import {useParams} from "react-router-dom";

import ContactForm from "../../components/contactsForm/contactForm.component";


const ContactAddEdit:FC = ()=> {
    const { id } = useParams()
    const isAddNew = !id

    return(
        <>
            <h5>Contact Form</h5>

            <ContactForm/>
        </>
    )
}

export default ContactAddEdit