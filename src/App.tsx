import React from "react";
import Users from "./components/Users";
import Cards from "./components/Cards";

import "antd/dist/antd.css";
import { Container } from "react-bootstrap";
import Audits from "./components/Audits";


function App() {
  
  const url =
    process.env.NODE_ENV === "production"
      ? "/api"
      : "http://localhost:3001/api";


  return (
    <Container>
        <Users url={url}></Users>
        <Cards url={url}></Cards>
        <Audits url={url}></Audits>
    </Container>
  );
}

export default App;
