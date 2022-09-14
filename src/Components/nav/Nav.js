import React from 'react';
import './Nav.css'
import {useLocation} from 'react-router-dom'

export const Nav = ({match, history}) => {

    const location = useLocation();

    // console.log('pathname', location.pathname);

    return (
        <div className={'Nav'}>
            <button>Back to Home</button>
            <button>Add New Contact</button>
        </div>
    );
};
