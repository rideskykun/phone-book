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

            {/*Favourites*/}
            <h3>Favourites</h3>


            {/*Contact List*/}
            <h3>Contact List</h3>
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
                                <td>
                                    {c.phones.length>0? c.phones[0].number: '-'}
                                    <br/>
                                    <h6 style={{margin:'0', color:'darkcyan'}}>
                                        {c.phones.length>1? `and ${c.phones.length-1} more` : null}
                                    </h6>
                                </td>
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