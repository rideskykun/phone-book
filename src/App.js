import logo from './logo.svg';
import './App.css';
import {Route, Routes} from "react-router-dom";
import {ContactList} from "./Pages";

function App() {
  return (
    <div className="App">
      <h1>Phone Book</h1>
        <Routes>
            <Route path={'/'} element={<ContactList/>} strict exact/>
        </Routes>
    </div>
  );
}

export default App;
