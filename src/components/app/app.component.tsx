import React, {FC} from 'react'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import {css, Global} from '@emotion/react'
import {ApolloProvider} from "@apollo/client";
import styled from "@emotion/styled";

import client from "../../common/apolloClient";
import Header from '../header/header.component'
import ContactList from "../../pages/contactList/contactList.page";
import ContactAddEdit from "../../pages/contactForm/contactAddEdit.page";
import Status from "../../pages/status/status.page";

const AppWrapper = styled.div`
  max-width: 70rem;
  margin: 0 auto;
  padding-bottom: 5rem;
`

const App: FC = () => {

    return(
        <>
            <ApolloProvider client={client}>
                <AppWrapper>
                    {/*routing*/}
                    <Router>
                        <Header/>
                        <Routes>
                            {/*<Route path={'*'} element={<Navigate to={'/status/error'}/>}/>*/}
                            <Route path={'/'} element={<Navigate to={'/list'}/>}/>
                            <Route path={'list'}>
                                <Route index element={<ContactList/>}/>
                                <Route path={':page'} element={<ContactList/>}/>
                            </Route>
                            <Route path={'/add'} element={<ContactAddEdit/>}/>
                            <Route path={'/edit/:id'} element={<ContactAddEdit/>}/>
                            <Route path={'/status/:message'} element={<Status/>}/>
                        </Routes>
                    </Router>
                </AppWrapper>

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
              
              *::-webkit-scrollbar {display: none;}
              *{
              -ms-overflow-style: none;  /* IE and Edge */
              }
              
              h3{
                text-align: center;
                padding: 1rem 0 0.5rem 0;
              }
            `}/>

        </>
    )
}

export default App;