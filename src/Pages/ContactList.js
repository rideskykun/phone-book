import React, {useContext, useEffect, useState} from 'react';
import {Card} from "../Components/card";
import {GET_CONTACT_LIST} from "../GraphQL/Queries";
import {useQuery} from "@apollo/client";
import ContactContext from "../Contexts/ContactContext";

function ContactList(props) {
    //Constants & States
    const { favourites, addFavourite, removeFavourite } = useContext(ContactContext)
    const {error, loading, data} = useQuery(GET_CONTACT_LIST, {
        variables:{
            limit: 10,
            offset: 0,
            where:  {
                id: {
                    _nin: favourites.map(f => f.id)
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
            <div style={{display:'flex', justifyContent:'flex-start'}}>
                {favourites.length>0?
                    favourites.map(f => (
                        <div
                            style={{width:'24%'}}
                        >
                            <Card>
                                <div style={{padding:'0.2rem', margin:'0'}}>
                                    <h5>{`${f.first_name} ${f.last_name}`}</h5>
                                    <h5
                                        style={{whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}
                                    >
                                        {f.phones.length>0? f.phones[0].number: '-'}
                                    </h5>
                                    <button
                                        onClick={()=>removeFavourite(f.id)}
                                    >Remove</button>
                                </div>
                            </Card>
                        </div>
                    ))
                    :
                    <p>No favourites added yet</p>
                }
            </div>


            {/*Contact List*/}
            <h3>Contact List</h3>
            <Card>
                <table style={{width:'100%'}}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Number</th>
                            <th colSpan={2}>Action</th>
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
                                <td>
                                    <button>Edit</button>
                                </td>
                                <td>
                                    <button
                                        onClick={()=>{addFavourite(c)}}
                                        disabled={favourites.length>3}
                                    >&#9733;</button>
                                </td>
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