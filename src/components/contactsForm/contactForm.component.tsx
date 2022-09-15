import React, {FC, useEffect, useState} from 'react'
import {useAddContact} from "../../hooks/contacts/useAddContact";
import {useGetContactDetails} from "../../hooks/contacts/useGetContactDetails";
import {useEditContact} from "../../hooks/contacts/useEditContact";

interface ContactFormProps {
    id?: number
}

const ContactForm:FC = () => {
    //States & Constants
    const [fName, setFName] = useState('')
    const [lName, setLName] = useState('')
    const [phones, setPhones] = useState<string[]>([])

    //Hooks
    const addContact = useAddContact()
    const editContact = useEditContact()

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
    }

    return(
        <div>
            <h3>Add New Contact</h3>
            <label>
                First Name
                <input value={fName} onChange={(e)=>setFName(e.target.value)} type="text" placeholder={'First Name'}/>
            </label>
            <br/>
            <label>
                Last Name
                <input value={lName} onChange={(e)=>setLName(e.target.value)} type="text" placeholder={'Last Name'}/>
            </label>
            <br/>
            {
                phones.length>0?
                    phones.map((p, index) => (
                        <>
                            <label key={index}>
                                Phone Number {index+1}
                                <input value={p} onChange={e=>handleChangePhoneNumber(e.target.value, index)} type="text" placeholder={'081232132123'}/>
                            </label>
                            <button onClick={()=>handleRemovePhoneNumber(index)}>remove</button>
                            <br/>
                        </>
                    ))
                    :
                    <p>No Phone Number Yet</p>
            }
            <br/>
            <button onClick={()=>handleAddPhoneNumber()}>Add Phone Number</button>
            <br/>

            <button onClick={()=>{handleSubmit()}}>submit</button>
        </div>
    )
}

export default ContactForm