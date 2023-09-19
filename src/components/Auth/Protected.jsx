import React from 'react'
import { Navigate } from "react-router-dom";

const Protected = (props) => {
    const Cmp=props.cmp;
    let userDetails=JSON.parse(sessionStorage.getItem('userDetails'));
    return (<div>{userDetails ? <Cmp /> : <Navigate to="/signin"/> }</div>);
}

export default Protected;
