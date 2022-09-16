import React, {FC} from 'react'
import {useParams} from "react-router-dom";
import {capitalize} from "../../common/utils";

const Status:FC = () => {
    let params = useParams()

    return(
        <>
            {capitalize(params.message? params.message : "error")}
        </>
    )
}

export default Status