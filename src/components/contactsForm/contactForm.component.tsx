import React, {FC, useState} from 'react'
import {useLazyQuery} from "@apollo/client";
import {useNavigate} from "react-router-dom";

import {useAddContact} from "../../hooks/contacts/useAddContact";
import {GET_CONTACTS} from "../../hooks/contacts/useGetContacts";
import styled from "@emotion/styled";

const FormWrapper = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  
  input[type=text]{
    width: 100%;
    padding: 0.5rem 1rem;
    box-sizing: border-box;
  }
  
  button{
    padding: 0.5rem 1rem;
    :hover{
      cursor: pointer;
    }
  }
`

const PhoneInputWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  
  input{
    width: 85%;
    padding: 0.5rem 1rem;
    box-sizing: border-box;
  }
`

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
    const [checkContactUnique] = useLazyQuery(GET_CONTACTS)

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

        if(!tempFName || !tempLName) alert('Please fill in the fields')
        else if(tempFName.match(spChar) || tempLName.match(spChar)) alert('You may not use Special Characters')
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
        <FormWrapper>
            <label> First Name</label>
            <input value={tempFName} onChange={(e)=>setTempFName(e.target.value)} type="text" placeholder={'John'}/>

            <label>Last Name</label>
            <input value={tempLName} onChange={(e)=>setTempLName(e.target.value)} type="text" placeholder={'Doe'}/>

            <br/>
            <button onClick={()=>handleVerifyNames()}>Verify Names</button>
            <br/>
            {nameVerified && tempFName === fName && tempLName === lName?
                <>
                    <label> Phone Numbers </label>
                    {
                        phones.length>0?
                            phones.map((p, index) => (
                                <PhoneInputWrapper key={index}>
                                    <input value={p} onChange={e=>handleChangePhoneNumber(e.target.value, index)} type="phone" placeholder={'081232132123'}/>
                                    <button onClick={()=>handleRemovePhoneNumber(index)}>X</button>
                                </PhoneInputWrapper>
                            ))
                            :
                            <input type={'text'} disabled value={'No Phone Numbers Yet'}/>
                    }
                    <button onClick={()=>handleAddPhoneNumber()}>Add Phone Number</button>
                    <br/>

                    <button onClick={()=>{handleSubmit()}} disabled={phones.length<1}>Submit</button>
                </>
                :null
            }
        </FormWrapper>
    )
}

export default ContactForm