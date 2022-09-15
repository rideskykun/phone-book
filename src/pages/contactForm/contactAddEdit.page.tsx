import React, {FC} from 'react'
import {useParams} from "react-router-dom";

import ContactForm from "../../components/contactsForm/contactForm.component";
import ContactsEdit from "../../components/contactsEdit/contactsEdit.component";


const ContactAddEdit:FC = ()=> {
    const { id } = useParams()
    const isAddNew = !id

    return(
        <>
            Contact Form
            <br/>

            {isAddNew?
                <ContactForm/>
                :
                <ContactsEdit id={Number(id)}/>
            }
        </>
    )
}

export default ContactAddEdit