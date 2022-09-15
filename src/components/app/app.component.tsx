import React, {FC} from 'react'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import {css, Global} from '@emotion/react'

import Header from '../header/header.component'

import './app.component.css'
import ContactList from "../../pages/contactList/contactList.page";
import ContactForm from "../../pages/contactForm/contactForm.page";

const App: FC = () => {

    return(
        <>
            {/*global style*/}
            <Global styles={css`
              *,
              *::before,
              *::after{
                margin: 0;
                padding: 0;
                box-sizing: border-box;
              }
            `}/>

            {/*routing*/}
            <Router>
                <Header/>

                <Routes>
                    <Route path={'/'} element={<Navigate to={'/list/page/1'}/>}/>
                    <Route path={'/list/page/:page'} element={<ContactList/>}/>
                    <Route path={'/add'} element={<ContactForm/>}/>
                    <Route path={'/edit/:id'} element={<ContactForm/>}/>
                </Routes>
            </Router>
        </>
    )
}

export default App;