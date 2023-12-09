import React,{useEffect,useState,useContext} from 'react'
import CustomerComp from '../components/CustomerComp'
import Axios from 'axios'
import {store} from '../App'
import { useNavigate } from 'react-router-dom';

import '../css/CustomerDashboard.css'

function CustomerDashboard() {

    const navigate = useNavigate();
    const {customersList,setCustomersList}=useContext(store)

    const [search,setSearch] = useState("");    
    const [filter,setFilter] = useState("firstName");
   

useEffect(()=>{

    if(search==""){
    Axios.get("https://ays-mern-backend.onrender.com/getusersforadmin",{headers:{"authorization":`bearer ${localStorage.getItem("token")}`}}).then((res)=>{
        
        if(res.data.auth){
        setCustomersList(res.data.users)
        console.log(res.data)
        }
        else{
            navigate('/');
        }
    }).then((res)=>{
        console.log(1)
    })
}


},[search])


const updateList = () => {
    Axios.get(`https://ays-mern-backend.onrender.com/filtercustomersforadmin/?filter=${filter}&search=${search}`,{headers:{"authorization":`bearer ${localStorage.getItem("token")}`}}).then((response) => {
        console.log("Update list Function",response.data)

        if(response.data.auth){
            setCustomersList(response.data.users);
        }
        else{
            navigate('/');
        }
})
}


  return (
    <div>
          <div className="content-wrapper">
              <div className="content-header">
                  <div className="container-fluid">
                      <div className="row mb-2">
                          <div className="col-sm-6">
                            <h1 className="m-0">Customers</h1>
                          </div>
                          <div className="col-sm-6">
                              <ol className="breadcrumb float-sm-right">
                                  {/* <li className="breadcrumb-item"><a href="#">Home</a></li>
              <li className="breadcrumb-item active">Dashboard v1</li> */}
                              </ol>
                          </div>
                      </div>
                  </div>
              </div>

          <div>
            <div style={{marginTop:"70px",display: 'flex',justifyContent: 'center'}}>
            <input style={{width:"400px",height:"50px",borderRadius:"5px"}} onChange={(e)=>{
                setSearch(e.target.value)
            }} type="text" name="searchCustomer" placeholder="Search Customer"/>
            {/* <button type="button" style={{borderRadius:"5px",height:"48px"}} onClick={()=>{
                updateList();
            }} class="btn btn-success">Search</button> */}

            <button type="button" class="btn btn-primary" style={{marginTop:"5px",marginLeft:"20px"}} onClick={()=>{
                updateList();
            }}>Search</button>
            </div>



            <div style={{display:"flex",justifyContent:"center"}}>
                <div style={{marginTop:"25px",marginLeft:"50px"}}>
                <label htmlFor="filter">Filter by </label>
                
                </div>
               
               <div>
                <select className="form-control" name="filter" id="filter" style={{width:"200px",marginLeft:"20px",marginTop:"20px"}} onChange={(e)=>{
                    setFilter(e.target.value)
                }
                }>
                    <option value="firstName">First Name</option>
                    <option value="lastName">Last Name</option>
                    <option value="email">Email</option>
                    <option value="phone">Phone</option>
                    <option value="city">City</option>
                    <option value="state">State</option>
                    <option value="pincode">Pincode</option>
                </select>
                </div>
            </div>
          </div>

          

                         
            <hr style={{height:"3px",marginTop:"60px"}}></hr>
        





        {customersList.length > 0 ? (

            <div>
                <table>
                    <tr>
                        <th>Id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone</th> 
                        <th>City</th>
                        <th>State</th>
                        <th>Pincode</th>
                        <th>Delete</th>
                    </tr>
                    {customersList.map((val) => {
                        return (
                            <tr>
                                <td>{val._id.valueOf()}</td>
                                <td>{val.firstName}</td>
                                <td>{val.lastName}</td>
                                <td>{val.email}</td>
                                <td>{val.phone}</td>
                                <td>{val.city}</td>
                                <td>{val.state}</td>
                                <td>{val.pincode}</td>
                                <td><button style={{color:'red'}} onClick={()=>{
                                    Axios.delete(`https://ays-mern-backend.onrender.com/deleteuser/${val._id.valueOf()}`,{headers:{"authorization":`bearer ${localStorage.getItem("token")}`}}).then((res)=>{
                                        console.log(res.data)
                                        if(res.data.auth){
                                            updateList();
                                            alert("Customer Deleted")
                                        }
                                    })
                                }
                                }>Delete</button></td>

                            </tr>
                        )
                    }
                    )}
                </table>
            </div>

            ):
            (
                <div><div style={{display:"flex",justifyContent:"center",marginTop:"50px"}}><h1>No Customers Found</h1></div></div>
            )}



        {/* {customersList.length > 0 ? (

                  <div style={{ display: "grid", "grid-template-columns": "repeat( 2, minmax(250px, 1fr) )" }}>
                      {customersList.map((val) => {
                          return (
                              <CustomerComp
                                  id={val._id.valueOf()}
                                  firstName={val.firstName}
                                  lastName={val.lastName}
                                  email={val.email}
                                  phone={val.phone}
                                  address={val.address}
                                  city={val.city}
                                  state={val.state}
                                  pincode={val.pincode}
                                  imgurl={val.imgurl}
                              />
                          )
                      }
                      )}

                  </div>



        ):(<div style={{display:"flex",justifyContent:"center",marginTop:"50px"}}><h1>No Customers Found</h1></div>)}

         */}

          </div>

          
</div>
  )
}

export default CustomerDashboard
