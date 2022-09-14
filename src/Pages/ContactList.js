import React, {useContext, useEffect, useState} from 'react';
import {Card} from "../Components/card";
import {GET_CONTACT_LIST} from "../GraphQL/Queries";
import {useLazyQuery, useQuery} from "@apollo/client";
import ContactContext from "../Contexts/ContactContext";
import {Link, useLocation} from "react-router-dom";

function ContactList(props) {
    //Constants & States
    const { favourites, addFavourite, removeFavourite } = useContext(ContactContext)
    let query = new URLSearchParams(useLocation().search)
    const [page,setPage] = useState(Number(query.get('page')!==null?query.get('page'):1))
    const [contacts, setContacts] = useState([])
    const [fetchContacts, {error, loading, data}] = useLazyQuery(GET_CONTACT_LIST)

    useEffect(()=>{
        setPage(Number(query.get('page')!==null?query.get('page'):1))
        fetchContacts({
            variables:{
                limit: 10,
                offset: 10 * (page-1),
                where: {
                    id: {
                        _nin: favourites.map(f => f.id)
                    }
                }
            }
        }).then(r=>null)
    },[query])
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
                    <tbody style={{overflow:'auto'}}>
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
                        <tr>
                            <td colSpan={3} style={{textAlign:'center'}}>
                                No Data
                            </td>
                        </tr>
                    }
                    </tbody>
                </table>
                <div style={{display:'flex', justifyContent:'space-between', padding:'0.5rem'}}>
                    Page {page}
                    <div>
                        {
                            page>1?
                                <Link to={'/?page='+ (page-1)}>
                                    <button>Prev</button>
                                </Link>
                                :null
                        }
                        {
                            contacts.length<10?
                                null
                                :
                                <Link to={'/?page='+ (page+1)}>
                                    <button>Next</button>
                                </Link>
                        }
                    </div>
                </div>
            </Card>

            

        </div>
    );
}

export default ContactList;