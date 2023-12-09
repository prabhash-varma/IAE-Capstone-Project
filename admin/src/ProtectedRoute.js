import {Link, useNavigate} from 'react-router-dom';
import {store} from './App.js'
import React, { useEffect,useContext } from 'react'

function ProtectedRoute(props) {
    const {Component} = props;
    const navigate = useNavigate();
    const {admindetails,setAdminDetails} = useContext(store)
    useEffect(() => {
        
        if(admindetails.email===""){
            navigate('/');
        }
    }, [])



  return <Component/>

  
}

export default ProtectedRoute
