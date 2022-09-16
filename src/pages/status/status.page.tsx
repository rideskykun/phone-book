import React, {FC, useEffect, useState} from 'react'
import {useNavigate, useParams} from "react-router-dom";
import {capitalize} from "../../common/utils";
import styled from "@emotion/styled";

const StatusWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 40vh;
  h6{
    font-size: 4rem;
  }
  p{
    font-size: 1.2rem;
    transition: 1s;
  }
`

const Status:FC = () => {
    let params = useParams()
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setTimeout(()=>{
            setLoading(true)
        }, 500)
        setTimeout(()=>{
            navigate('/')
        }, 2500)
    },[])

    return(
        <StatusWrapper>
            <h6>{capitalize(params.message? params.message : "error")}</h6>
            <p style={{visibility: loading? 'visible' : 'hidden'}}>Redirecting to Home</p>
        </StatusWrapper>
    )
}

export default Status