import React from 'react';
import './Card.css'

export const Card = ({children}) => {
    return (
        <div className={'Card'}>
            {children}
        </div>
    );
};
