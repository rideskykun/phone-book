import React, {FC} from 'react'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import {css, Global} from '@emotion/react'
import {ApolloProvider} from "@apollo/client";


import Header from '../header/header.component'
import ContactList from "../../pages/contactList/contactList.page";
import ContactForm from "../../pages/contactForm/contactForm.page";
import client from "../../common/apolloClient";

import './app.component.css'

const App: FC = () => {

    return(
        <>
            <ApolloProvider client={client}>

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

            </ApolloProvider>

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

        </>
    )
}

export default App;