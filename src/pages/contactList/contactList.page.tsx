import React, {FC} from 'react'
import ContactsGrid from "../../components/contactsGrid/contactsGrid.component";

const ContactList:FC = ()=> {
    const sampleContacts = [
        {
            created_at: "2022-09-14T22:21:36.160627+00:00",
            first_name: "John2",
            id: 1570,
            last_name: "Doe2",
            phones: [
                {
                    "number": "+62929292922374ds4"
                },
                {
                    "number": "+62929292922dsd344"
                }
            ]
        }
    ]

    return(
        <>
            Contact List

            <ContactsGrid contacts={sampleContacts}/>
        </>
    )
}

export default ContactList