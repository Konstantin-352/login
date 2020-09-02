import React, {useState} from 'react';
import './App.css';
import Login from "./components/login/Login";
import Profile from "./components/profile/Profile";

function App() {
    const [isLogged, setLogged] = useState(false);
    const [token, setToken] = useState(null);
    // debugger;
    return (isLogged ? <Profile token={token} setLogged={setLogged}/> : <Login setLogged={setLogged} setToken={setToken}/>);
}

export default App;
