import React from 'react';
import './Nav.css'
import {NavLink, useLocation} from 'react-router-dom'

export const Nav = ({match, history}) => {

    const location = useLocation();

    // console.log('pathname', location.pathname);

    return (
        <div className={'Nav'}>
            <NavLink to={'/'}>
                <button>Back to Home</button>
            </NavLink>
            <NavLink to={'/add'}>
                <button>Add New Contact</button>
            </NavLink>
        </div>
    );
};
