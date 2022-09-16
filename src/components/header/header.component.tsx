import React, {FC} from 'react'
import {useNavigate} from 'react-router-dom'
import styled from "@emotion/styled";

const FixedHeader = styled.header`
  position: fixed;
  bottom: 0;
  left:0;
  width: 100%;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  //box-shadow: 0 -5px 5px -5px rgb(0 0 0 / 0.25);
  nav{
    background-color: white;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    display: flex;
    align-items: center;
    width: 80%;
    height: 100%;
    box-shadow: 0 0 10px 1px rgb(0 0 0 / 0.25);
    ul{
      display: flex;
      justify-content: center;
      list-style: none;
      gap: 1rem;
      padding: 0 1rem;
      width: 100%;
      li{
        width: 100%;
      }
    }
  }
`

const NavButton = styled.button`
  border: none;
  padding: 0.7rem;
  width: 100%;

  :hover {
    background-color: #e6e6e7;
    cursor: pointer;
  }

  :active {
    background-color: #d0d0d0;
  }
`

const Header:FC = () => {
    const navigate = useNavigate()

    return(
        <FixedHeader>
            <nav>
                <ul>
                    <li>
                        <NavButton onClick={()=>navigate('/')}>Home</NavButton>
                    </li>
                    <li>
                        <NavButton onClick={()=>navigate('/add')}>Add New</NavButton>
                    </li>
                </ul>
            </nav>
        </FixedHeader>
    )
}

export default Header;