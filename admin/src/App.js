
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import MainDashboard from './pages/MainDashboard';
import Customers from './pages/Customers';
import Employees from './pages/Employees';
import Orders from './pages/Orders';
import React,{useContext,createContext,useState} from 'react'
import Messages from './pages/Messages'
import Login from './pages/Login'
import ProtectedRoute from './ProtectedRoute'

export const store = createContext();


function App() {

  const [customersList,setCustomersList]=useState([])
  const [employeesList,setEmployeesList]=useState([])
  const [ordersList,setOrdersList]=useState([])
  const [msgList,setMsgList]=useState([])

  const [admindetails,setAdminDetails]=useState({email:"",password:""})

  return (
    <div className="App">
      <store.Provider value={{admindetails,setAdminDetails,customersList,setCustomersList,employeesList,setEmployeesList,ordersList,setOrdersList,msgList,setMsgList}}>
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/dashboard" element={<ProtectedRoute Component={MainDashboard} />}/>
          <Route path="/messages" element={<ProtectedRoute Component={Messages}/>}/>
          <Route path="/customers" element={<ProtectedRoute Component={Customers}/>}/>
          <Route path="/employees" element={<ProtectedRoute Component={Employees}/>}/>
          <Route path="/orders" element={<ProtectedRoute Component={Orders}/>}/>
        </Routes>
      
      </BrowserRouter>
      </store.Provider>
    </div>
  );
}

export default App;
