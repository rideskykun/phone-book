import './App.css';
import {Route, Routes} from "react-router-dom";
import {ContactList} from "./Pages";
import {ContactProvider} from "./Contexts/ContactContext";
import FormContact from "./Pages/FormContact";
import {Nav} from "./Components/nav";

function App() {
  return (
    <div className="App">
      <h1>Phone Book</h1>

        <ContactProvider>
            <Nav/>
            <Routes>
                <Route path={'/'} element={<ContactList/>} strict exact/>
                <Route path={'/add'} element={<FormContact/>} strict exact/>
                <Route path={'/edit/:id'} element={<FormContact/>} strict exact/>
            </Routes>
        </ContactProvider>
    </div>
  );
}

export default App;
