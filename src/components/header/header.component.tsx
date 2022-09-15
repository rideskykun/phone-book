import React, {FC} from 'react'
import {NavLink} from 'react-router-dom'

const Header:FC = () => {
    return(
        <header>
            <nav>
                <ul>
                    <li>
                        <NavLink to={'/list/page/1'}>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/add'}>New Contact</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;