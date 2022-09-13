import React from 'react';
import './Nav.css'

export const Nav = ({match, history}) => {
    return (
        <div className={'Nav'}>
            <button>Back to Home</button>
            <button>Add New Contact</button>
        </div>
    );
};
