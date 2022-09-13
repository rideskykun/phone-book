import React, {useEffect, useState} from 'react';
import {Card} from "../Components/card";
import {GET_CONTACT_LIST} from "../GraphQL/Queries";
import {useQuery} from "@apollo/client";

function ContactList(props) {
    //Constants & States
    const {error, loading, data} = useQuery(GET_CONTACT_LIST, {
        variables:{
            limit: 10,
            offset: 0,
            where:  {
                first_name: {
                    _nin: ["Xendalgia"]
                }
            }
        }
    })

    const [contacts, setContacts] = useState([])

    useEffect(()=>{
        if(data) setContacts(data.contact)
    }, [data])

    if(error) return(
        <div>
            Error
        </div>
    )

    if(loading) return(
        <div>
            Please Wait
        </div>
    )


    return (
        <div>
            Contact List
            <Card>
                <table style={{width:'100%'}}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Number</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {contacts.length>0?
                        contacts.map(c => (
                            <tr>
                                <td>{`${c.first_name} ${c.last_name}`}</td>
                                <td>{c.phones[0].number}</td>
                                <button>Edit</button>
                            </tr>
                        ))
                        :
                        null
                    }
                    </tbody>
                </table>
            </Card>
        </div>
    );
}

export default ContactList;