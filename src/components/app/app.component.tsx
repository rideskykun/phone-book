import React, {FC} from 'react'
import {BrowserRouter as Router, Routes} from 'react-router-dom'
import {css, Global} from '@emotion/react'

import Header from '../header/header.component'

import './app.component.css'

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
                    
                </Routes>
            </Router>
        </>
    )
}

export default App;