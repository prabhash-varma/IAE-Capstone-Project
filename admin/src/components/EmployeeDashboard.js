import React, { useState, useContext, useEffect } from 'react'
import { store } from '../App'
import EmployeeComp from '../components/EmployeeComp'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'


function EmployeeDashboard() {

    const navigate = useNavigate();
    const { employeesList, setEmployeesList } = useContext(store)

    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("firstName");


    useEffect(() => {

        if (search == "") {
            Axios.get("https://ays-mern-backend.onrender.com/getemployeesforadmin", {headers:{"authorization":`bearer ${localStorage.getItem("token")}`}}).then((res) => {

                if (res.data.auth) {
                    setEmployeesList(res.data.employees)
                    //console.log(res.data.employees)
                }
                else {
                    navigate('/');
                }
            }).then((res) => {
                console.log(1)
            })
        }


    }, [search])


    const updateList = () => {
        Axios.get(`https://ays-mern-backend.onrender.com/filteremployeesforadmin/?filter=${filter}&search=${search}`, {headers:{"authorization":`bearer ${localStorage.getItem("token")}`}}).then((response) => {
            console.log("Emp Update list Function", response.data)

            if (response.data.auth) {
                setEmployeesList(response.data.employees)
            }
            else {
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
                                <h1 className="m-0">Employees</h1>
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
                    <div style={{ marginTop: "70px", display: 'flex', justifyContent: 'center' }}>
                        <input style={{ width: "400px", height: "50px", borderRadius: "5px" }} onChange={(e) => {
                            setSearch(e.target.value)
                        }} type="text" name="searchCustomer" placeholder="Search Employee..." />
                        <button type="button" style={{ borderRadius: "5px", height: "48px" }} onClick={() => {
                            updateList();
                        }} class="btn btn-success">Search</button>
                    </div>



                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <div style={{ marginTop: "25px", marginLeft: "50px" }}>
                            <label htmlFor="filter">Filter by </label>
                        </div>

                        <div>
                            <select className="form-control" name="filter" id="filter" style={{ width: "200px", marginLeft: "20px", marginTop: "20px" }} onChange={(e) => {
                                setFilter(e.target.value)
                            }
                            }>
                                <option value="firstName">First Name</option>
                                <option value="lastName">Last Name</option>
                                <option value="gender">Gender</option>
                                <option value="profession">Profession</option>
                                <option value="email">Email</option>
                                <option value="phone">Phone</option>
                                <option value="city">City</option>
                                <option value="state">State</option>
                                <option value="pincode">Pincode</option>
                            </select>
                        </div>
                    </div>
                </div>


                <hr style={{ height: "3px", marginTop: "60px" }}></hr>



                {employeesList.length > 0 ? (

                    <div>
                        <table>
                            <tr>
                                <th>Id</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Profession</th>
                                <th>State</th>
                                <th>Pincode</th>
                                <th>Status</th>
                                <th>Delete</th>
                            </tr>
                            {employeesList.map((val) => {
                                return (
                                    <tr>
                                        <td>{val._id.valueOf()}</td>
                                        <td>{val.firstName}</td>
                                        <td>{val.lastName}</td>
                                        <td>{val.email}</td>
                                        <td>{val.phone}</td>
                                        <td>{val.profession}</td>
                                        <td>{val.state}</td>
                                        <td>{val.pincode}</td>
                                        <td>{val.free == 1 ? "Free" : "Busy"}</td>
                                        
                                        <td><button style={{ color: 'red' }} onClick={() => {
                                            Axios.delete(`https://ays-mern-backend.onrender.com/deleteemployee/${val._id.valueOf()}`, {headers:{"authorization":`bearer ${localStorage.getItem("token")}`}}).then((res) => {
                                                console.log(res.data)
                                                if (res.data.auth) {

                                                    updateList();
                                                    alert("Employee Deleted Successfully")
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

                ) :
                    (
                        <div><div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}><h1>No Employees Found</h1></div></div>
                    )}



                {/* {employeesList.length > 0 ? (

                    <div style={{ display: "grid", "grid-template-columns": "repeat( 2, minmax(250px, 1fr) )" }}>
                        {employeesList.map((val) => {
                            return (
                                <EmployeeComp
                                    id={val._id.valueOf()}
                                    firstName={val.firstName}
                                    lastName={val.lastName}
                                    gender={val.gender}
                                    profession={val.profession}
                                    email={val.email}
                                    phone={val.phone}
                                    address={val.address}
                                    city={val.city}
                                    state={val.state}
                                    pincode={val.pincode}
                                    free={val.free}
                                />
                            )
                        }
                        )}

                    </div>



                ) : (<div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}><h1>No Employees Found</h1></div>)}
 */}


            </div>


        </div>

    )
}

export default EmployeeDashboard
