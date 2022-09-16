import React, {FC, useEffect, useState} from 'react'
import {useLazyQuery} from "@apollo/client";
import {useNavigate} from "react-router-dom";

import {useAddContact} from "../../hooks/contacts/useAddContact";
import {GET_CONTACTS} from "../../hooks/contacts/useGetContacts";

const ContactForm:FC = () => {
    //States & Constants
    let navigate = useNavigate();
    const [fName, setFName] = useState('')
    const [lName, setLName] = useState('')
    const [tempFName, setTempFName] = useState('')
    const [tempLName, setTempLName] = useState('')
    const [phones, setPhones] = useState<string[]>([])
    const [nameVerified, setNameVerified] = useState<boolean>(false)

    //Hooks
    const addContact = useAddContact()
    const [checkContactUnique, uniqueResults] = useLazyQuery(GET_CONTACTS)

    //Functions
    const handleAddPhoneNumber = () => {
        setPhones([...phones, ''])
    }
    const handleRemovePhoneNumber = (index: number) => {
        let temp = phones.slice();
        temp.splice(index,1)
        setPhones(temp)
    }
    const handleChangePhoneNumber = (phone: string, index: number) => {
        let temp = phones.slice();
        temp[index] = phone;
        setPhones(temp)
    }

    const handleVerifyNames = async() => {
        let spChar = /[!@#$%^&*(),.?":{}|<>]/g
        let isUnique = false
        await checkContactUnique({
            variables: {
                where: {
                    first_name: {_like: tempFName},
                    _and: {
                        last_name: {_like: tempLName}
                    }
                }
            },
            fetchPolicy: 'network-only',
            onCompleted : (data => {isUnique = (data.contact.length<1)})
        }).then(r=>null)

        if(tempFName.match(spChar) || tempLName.match(spChar)) alert('You may not use Special Characters')
        else if(!isUnique) alert('Duplicate Named Contact Found')
        else {
            setNameVerified(true)
            setFName(tempFName)
            setLName(tempLName)
        }
    }

    const handleSubmit = () => {
        addContact({
            variables: {
                first_name: fName,
                last_name: lName,
                phones: phones.map(p => {
                    return {number:p}
                })
            }
        })

        navigate('/status/success')
    }

    return(
        <div>
            <label>
                First Name
                <input value={tempFName} onChange={(e)=>setTempFName(e.target.value)} type="text" placeholder={'First Name'}/>
            </label>
            <br/>
            <label>
                Last Name
                <input value={tempLName} onChange={(e)=>setTempLName(e.target.value)} type="text" placeholder={'Last Name'}/>
            </label>
            <br/>
            <button onClick={()=>handleVerifyNames()}>Verify Names</button>
            <br/>
            {nameVerified && tempFName === fName && tempLName === lName?
                <>
                    <label>
                        Phone Numbers <br/>
                        {
                            phones.length>0?
                                phones.map((p, index) => (
                                    <>
                                        <input value={p} onChange={e=>handleChangePhoneNumber(e.target.value, index)} type="text" placeholder={'081232132123'}/>
                                        <button onClick={()=>handleRemovePhoneNumber(index)}>remove</button>
                                        <br/>
                                    </>
                                ))
                                :
                                <p>No Phone Number Yet</p>
                        }
                    </label>
                    <br/>
                    <button onClick={()=>handleAddPhoneNumber()}>Add Phone Number</button>
                    <br/>

                    <button onClick={()=>{handleSubmit()}}>submit</button>
                </>
                :null
            }
        </div>
    )
}

export default ContactForm