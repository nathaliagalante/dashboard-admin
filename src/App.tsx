import React, { useMemo, useState } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import "antd/dist/antd.css";


import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import { UserContext } from './services/UserContext';

function App() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState({});
    const value = useMemo(() => ({user, setUser}), [user, setUser]);

  const url =
    process.env.NODE_ENV === "production"
      ? "/api"
      : "http://localhost:3001/api";

    const autenticar = (email: any, password: any) => {
        fetch(`${url}/analysts`)
          .then(response => response.json())
          .then(res => {
              res.filter((u: any) => {
                  if(u.email === email && u.password === password){
                      setEmail(u.email);
                      setPassword(u.password);
                      setUser(u);
                    console.log(u);
                  }
                  return true;
              })
          })
          .catch(err => {
              console.log(err)
              return false;
            })
            
        return true;
    }


  return (
    <BrowserRouter>
        <UserContext.Provider value={value}>
            <Routes>
                <Route path="/" element={<Login url={url} autenticar={autenticar} />}></Route>
                <Route path="/home/*" element={<Home url={url} user={user} />}></Route>
            </Routes>
        </UserContext.Provider>
        
    </BrowserRouter>
  );
}

export default App;
