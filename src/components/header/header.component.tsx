import React, {FC} from 'react'
import {useNavigate} from 'react-router-dom'

const Header:FC = () => {
    const navigate = useNavigate()

    return(
        <header>
            <nav>
                <ul>
                    <li>
                        <button onClick={()=>navigate('/')}>Home</button>
                    </li>
                    <li>
                        <button onClick={()=>navigate('/add')}>New Contact</button>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;