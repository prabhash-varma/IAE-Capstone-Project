import React,{useState,useEffect} from 'react'
import Axios from 'axios'
import MsgComp from './MsgComp'
import {store} from '../App'
import { useNavigate } from 'react-router-dom';

function MessagesDashboard() {

    const navigate = useNavigate();
   const {msgList,setMsgList}=React.useContext(store)

    const [search,setSearch] = useState("");    
    const [filter,setFilter] = useState("name")
   

useEffect(()=>{
    if(search===""){
    Axios.get("https://ays-mern-backend.onrender.com/getmessagesforadmin",{headers:{"authorization":`bearer ${localStorage.getItem("token")}`}}).then((res)=>{
        
        if(res.data.auth){
        setMsgList(res.data.messages)
        console.log(res.data.messages)
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
    Axios.get(`https://ays-mern-backend.onrender.com/filtermessagesforadmin/?filter=${filter}&search=${search}`,{headers:{"authorization":`bearer ${localStorage.getItem("token")}`}}).then((response) => {

    if(response.data.auth){
        setMsgList(response.data.messages);
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
                            <h1 className="m-0">Messages</h1>
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
            }} type="text" name="searchCustomer" placeholder="Search Messages..."/>
            <button type="button" style={{borderRadius:"5px",height:"48px"}} onClick={()=>{
                updateList();
            }} class="btn btn-success">Search</button>
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
                    
                    <option value="name">Customer Name</option>
                    <option value="email">Customer Email</option>
                    
                </select>
                </div>
            </div>
          </div>

                         
            <hr style={{height:"3px",marginTop:"60px"}}></hr>
        



        {msgList.length > 0 ? (

                  <div style={{ display: "grid", "grid-template-columns": "repeat( 2, minmax(250px, 1fr) )" }}>
                      {msgList.map((val) => {
                          return (
                              <MsgComp
                                    id={val._id.valueOf()}
                                    name= {val.name}
                                    email={val.email}
                                    message={val.message}
                                    
                              />

                          )
                      }
                      )}

                  </div>



        ):(<div style={{display:"flex",justifyContent:"center",marginTop:"50px"}}><h1>No Messages Found</h1></div>)}

        

          </div>

      
    </div>
  )
}

export default MessagesDashboard
