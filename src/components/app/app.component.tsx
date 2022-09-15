import React, {FC} from 'react'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import {css, Global} from '@emotion/react'
import {ApolloProvider} from "@apollo/client";


import Header from '../header/header.component'
import ContactList from "../../pages/contactList/contactList.page";
import ContactAddEdit from "../../pages/contactForm/contactAddEdit.page";
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
                        <Route path={'/'} element={<Navigate to={'/list'}/>}/>
                        <Route path={'list'}>
                            <Route index element={<ContactList/>}/>
                            <Route path={'page/:page'} element={<ContactList/>}/>
                        </Route>
                        <Route path={'/add'} element={<ContactAddEdit/>}/>
                        <Route path={'/edit/:id'} element={<ContactAddEdit/>}/>
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