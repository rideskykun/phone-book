import React, {FC} from 'react'

import ContactForm from "../../components/contactsForm/contactForm.component";


const ContactAddEdit:FC = ()=> {
    return(
        <>
            <h3>Add New Contact</h3>

            <ContactForm/>
        </>
    )
}

export default ContactAddEdit