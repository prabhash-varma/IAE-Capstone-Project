import React,{useContext} from 'react'
import {store} from '../App'
import {useEffect} from 'react'
import {useState} from 'react'
import Axios from 'axios'
import {useNavigate} from 'react-router-dom'
import Barchart from './Barchart'
import Piechart from './Piechart'

function Dashboard() {

  const navigate = useNavigate();
  const [EmpCount,setEmpCount] = useState(0);
  const [CustCount,setCustCount] = useState(0);
  const [OrderCount,setOrderCount] = useState(0);

  const [salonCount,setSalonCount] = useState(0);
  const [packersCount,setPackersCount] = useState(0);
  const [homeCount,setHomeCount] = useState(0);
  const [paintingCount,setPaintingCount] = useState(0);
  const [pestCount,setPestCount] = useState(0);
  const [applianceCount,setApplianceCount] = useState(0);


  const [bardata,setBardata] = useState({
    labels: ['Orders','Customers','Employees','Visitors'],
    datasets:[
      {
        label:'Statistics',
        backgroundColor:['#3e95cd','#8e5ea2','#3cba9f','#e8c3b9'],
        data:[OrderCount,CustCount,EmpCount,65]
      }
    ]

});


const [pieData,setPieData] = useState({
  labels: ['Salon','Packers and Movers','Home Cleaning','Painting','Pest Control','Appliances'],
  datasets:[
    {
      label:'Statistics',
      backgroundColor:['#3e95cd','#8e5ea2','#3cba9f','#e8c3b9','#964B00','#FFD700'],
      data:[salonCount,packersCount,homeCount,paintingCount,pestCount,applianceCount]
    }
  ]
})




  const [templist,setTemplist] = useState([]);

  useEffect(()=>{
    Axios.get('https://ays-mern-backend.onrender.com/getemployeesforadmin',{headers:{"authorization":`bearer ${localStorage.getItem("token")}`}}).then((response)=>{

    if(response.data.auth){
      setTemplist(response.data.employees)
      
      setEmpCount(response.data.employees.length)
      
    }
    else{
      navigate('/')
    }
    })
    .then(()=>{
      setBardata({
        labels: ['Orders','Customers','Employees','Visitors'],
        datasets:[
          {
            label:'Statistics',
            backgroundColor:['#3e95cd','#8e5ea2','#3cba9f','#e8c3b9'],
            data:[OrderCount,CustCount,EmpCount,65]
          }
        ]
      })
    })
  },[])

  useEffect(()=>{
    Axios.get('https://ays-mern-backend.onrender.com/getusersforadmin',{headers:{"authorization":`bearer ${localStorage.getItem("token")}`}}).then((response)=>{

    if(response.data.auth){
      setTemplist(response.data.users)
      setCustCount(response.data.users.length)
      
    }
    else{
      navigate('/')
    }
    }).then(()=>{
      setBardata({
        labels: ['Orders','Customers','Employees','Visitors'],
        datasets:[
          {
            label:'Statistics',
            backgroundColor:['#3e95cd','#8e5ea2','#3cba9f','#e8c3b9'],
            data:[OrderCount,CustCount,EmpCount,65]
          }
        ]
      })
    })
  },[])

  useEffect(()=>{
    Axios.get('https://ays-mern-backend.onrender.com/getordersforadmin',{headers:{"authorization":`bearer ${localStorage.getItem("token")}`}}).then((response)=>{

    if(response.data.auth){
      setTemplist(response.data.orders)
      setOrderCount(response.data.orders.length)
      
    }
    else{
      navigate('/')
    }
    }).then(()=>{
      setBardata({
        labels: ['Orders','Customers','Employees','Visitors'],
        datasets:[
          {
            label:'Statistics',
            backgroundColor:['#3e95cd','#8e5ea2','#3cba9f','#e8c3b9'],
            data:[OrderCount,CustCount,EmpCount,65]
          }
        ]
      })
    }).then(()=>{
       

    }).then(()=>{
      
    })
  },[])



useEffect(()=>{

 
  Axios.get(`https://ays-mern-backend.onrender.com/getcountforadmin?type=salon`).then((response)=>{
    setSalonCount(response.data.count)
  })

  Axios.get(`https://ays-mern-backend.onrender.com/getcountforadmin?type=packers and movers`).then((response)=>{
    setPackersCount(response.data.count)
  })

  Axios.get(`https://ays-mern-backend.onrender.com/getcountforadmin?type=home cleaning`).then((response)=>{
    setHomeCount(response.data.count)
  })

  Axios.get(`https://ays-mern-backend.onrender.com/getcountforadmin?type=painting`).then((response)=>{
    setPaintingCount(response.data.count)
  })

  Axios.get(`https://ays-mern-backend.onrender.com/getcountforadmin?type=pest control`).then((response)=>{
    setPestCount(response.data.count)
  })

  Axios.get(`https://ays-mern-backend.onrender.com/getcountforadmin?type=appliances`).then((response)=>{
    setApplianceCount(response.data.count)
  })



  setPieData({
    labels: ['Salon','Packers and Movers','Home Cleaning','Painting','Pest Control','Appliances'],
    datasets:[
      {
        label:'Statistics',
        backgroundColor:['#3e95cd','#8e5ea2','#3cba9f','#e8c3b9','#964B00','#FFD700'],
        data:[salonCount,packersCount,homeCount,paintingCount,pestCount,applianceCount]
      }
    ]
  })


},[templist])



  useEffect(()=>{

    setBardata({
      labels: ['Orders','Customers','Employees','Visitors'],
      datasets:[
        {
          label:'Statistics',
          backgroundColor:['#3e95cd','#8e5ea2','#3cba9f','#964B00'],
          data:[OrderCount,CustCount,EmpCount,65]
        }
      ]
    })



  
    setPieData({
      labels: ['Salon','Packers and Movers','Home Cleaning','Painting','Pest Control','Appliances'],
      datasets:[
        {
          label:'Statistics',
          backgroundColor:['#3e95cd','#8e5ea2','#3cba9f','#e8c3b9','#964B00','#FFD700'],
          data:[salonCount,packersCount,homeCount,paintingCount,pestCount,applianceCount]
        }
      ]
    })

  },[OrderCount,CustCount,EmpCount,bardata,salonCount,packersCount,homeCount,paintingCount,pestCount,applianceCount,pieData])


  






  return (
    <div>
  <div className="content-wrapper">
    <div className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1 className="m-0">Dashboard</h1>
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
    <section className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-3 col-6">
            <div className="small-box bg-info">
              <div className="inner">
                <h3>{OrderCount}</h3>
                <p>New Orders</p>
              </div>
              <div className="icon">
                <i className="ion ion-bag" />
              </div>
              <a onClick={()=>{
                navigate('/orders')
              }} className="small-box-footer" style={{cursor: 'pointer'}}>More info <i className="fas fa-arrow-circle-right" /></a>
            </div>
          </div>
          <div className="col-lg-3 col-6">
            <div className="small-box bg-success">
              <div className="inner">
                <h3>{CustCount}<sup style={{fontSize: 20}}></sup></h3>
                <p>Customers</p>
              </div>
              <div className="icon">
                <i className="ion ion-stats-bars" />
              </div>
              <a onClick={()=>{navigate("/customers")}} style={{cursor: 'pointer'}} className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
            </div>
          </div>
          <div className="col-lg-3 col-6">
            <div className="small-box bg-warning">
              <div className="inner">
                <h3>{EmpCount}</h3>
                <p>Employees</p>
              </div>
              <div className="icon">
                <i className="ion ion-person-add" />
              </div>
              <a onClick={()=>{navigate("/employees")}} style={{cursor: 'pointer'}} className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
            </div>
          </div>
          <div className="col-lg-3 col-6">
            <div className="small-box bg-danger">
              <div className="inner">
                <h3>65</h3>
                <p>Unique Visitors</p>
              </div>
              <div className="icon">
                <i className="ion ion-pie-graph" />
              </div>
              <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
            </div>
          </div>
        </div>

          
          

        <div style={{marginTop:'70px'}} className="row">

          <section>
            {/* Bar Chart */}
            <div  className="card card-primary">
              <div className="card-header">
                <h3 className="card-title">Statistics</h3>
                <div className="card-tools">
                  <button type="button" className="btn btn-tool" data-card-widget="collapse">
                    <i className="fas fa-minus" />
                  </button>
                  <button type="button" className="btn btn-tool" data-card-widget="remove">
                    <i className="fas fa-times" />
                  </button>
                </div>
              </div>
              <div style={{width:"700px"}} className="card-body">
                <div className="chart">
                  <canvas id="barChart" style={{ height: 10, width:"300px"}} />
                  <Barchart chartData={bardata} />
                </div>
              </div>

              <div style={{width:"700px"}} className="card-body">
                <div className="chart">
                  <canvas id="barChart" style={{ height: 10, width:"300px"}} />
                  <Barchart chartData={pieData} />
                </div>
              </div>



             
            </div>
         
    
          </section>


          {/* <section className="col-lg-7 connectedSortable">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">
                  <i className="fas fa-chart-pie mr-1" />
                  Sales
                </h3>
                <div className="card-tools">
                  <ul className="nav nav-pills ml-auto">
                    <li className="nav-item">
                      <a className="nav-link active" href="#revenue-chart" data-toggle="tab">Area</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#sales-chart" data-toggle="tab">Donut</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="card-body">
                <div className="tab-content p-0">
                  <div className="chart tab-pane active" id="revenue-chart" style={{position: 'relative', height: 300}}>
                    <canvas id="revenue-chart-canvas" height={300} style={{height: 300}} />
                  </div>
                  <div className="chart tab-pane" id="sales-chart" style={{position: 'relative', height: 300}}>
                    <canvas id="sales-chart-canvas" height={300} style={{height: 300}} />
                  </div>
                </div>
              </div>
            </div>
            <div className="card direct-chat direct-chat-primary">
              <div className="card-header">
                <h3 className="card-title">Direct Chat</h3>
                <div className="card-tools">
                  <span title="3 New Messages" className="badge badge-primary">3</span>
                  <button type="button" className="btn btn-tool" data-card-widget="collapse">
                    <i className="fas fa-minus" />
                  </button>
                  <button type="button" className="btn btn-tool" title="Contacts" data-widget="chat-pane-toggle">
                    <i className="fas fa-comments" />
                  </button>
                  <button type="button" className="btn btn-tool" data-card-widget="remove">
                    <i className="fas fa-times" />
                  </button>
                </div>
              </div>
              <div className="card-body">
                <div className="direct-chat-messages">
                  <div className="direct-chat-msg">
                    <div className="direct-chat-infos clearfix">
                      <span className="direct-chat-name float-left">Alexander Pierce</span>
                      <span className="direct-chat-timestamp float-right">23 Jan 2:00 pm</span>
                    </div>
                    <img className="direct-chat-img" src="dist/img/user1-128x128.jpg" alt="message user image" />
                    <div className="direct-chat-text">
                      Is this template really for free? That's unbelievable!
                    </div>
                  </div>
                  <div className="direct-chat-msg right">
                    <div className="direct-chat-infos clearfix">
                      <span className="direct-chat-name float-right">Sarah Bullock</span>
                      <span className="direct-chat-timestamp float-left">23 Jan 2:05 pm</span>
                    </div>
                    <img className="direct-chat-img" src="dist/img/user3-128x128.jpg" alt="message user image" />
                    <div className="direct-chat-text">
                      You better believe it!
                    </div>
                  </div>
                  <div className="direct-chat-msg">
                    <div className="direct-chat-infos clearfix">
                      <span className="direct-chat-name float-left">Alexander Pierce</span>
                      <span className="direct-chat-timestamp float-right">23 Jan 5:37 pm</span>
                    </div>
                    <img className="direct-chat-img" src="dist/img/user1-128x128.jpg" alt="message user image" />
                    <div className="direct-chat-text">
                      Working with AdminLTE on a great new app! Wanna join?
                    </div>
                  </div>
                  <div className="direct-chat-msg right">
                    <div className="direct-chat-infos clearfix">
                      <span className="direct-chat-name float-right">Sarah Bullock</span>
                      <span className="direct-chat-timestamp float-left">23 Jan 6:10 pm</span>
                    </div>
                    <img className="direct-chat-img" src="dist/img/user3-128x128.jpg" alt="message user image" />
                    <div className="direct-chat-text">
                      I would love to.
                    </div>
                  </div>
                </div>
                <div className="direct-chat-contacts">
                  <ul className="contacts-list">
                    <li>
                      <a href="#">
                        <img className="contacts-list-img" src="dist/img/user1-128x128.jpg" alt="User Avatar" />
                        <div className="contacts-list-info">
                          <span className="contacts-list-name">
                            Count Dracula
                            <small className="contacts-list-date float-right">2/28/2015</small>
                          </span>
                          <span className="contacts-list-msg">How have you been? I was...</span>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img className="contacts-list-img" src="dist/img/user7-128x128.jpg" alt="User Avatar" />
                        <div className="contacts-list-info">
                          <span className="contacts-list-name">
                            Sarah Doe
                            <small className="contacts-list-date float-right">2/23/2015</small>
                          </span>
                          <span className="contacts-list-msg">I will be waiting for...</span>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img className="contacts-list-img" src="dist/img/user3-128x128.jpg" alt="User Avatar" />
                        <div className="contacts-list-info">
                          <span className="contacts-list-name">
                            Nadia Jolie
                            <small className="contacts-list-date float-right">2/20/2015</small>
                          </span>
                          <span className="contacts-list-msg">I'll call you back at...</span>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img className="contacts-list-img" src="dist/img/user5-128x128.jpg" alt="User Avatar" />
                        <div className="contacts-list-info">
                          <span className="contacts-list-name">
                            Nora S. Vans
                            <small className="contacts-list-date float-right">2/10/2015</small>
                          </span>
                          <span className="contacts-list-msg">Where is your new...</span>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img className="contacts-list-img" src="dist/img/user6-128x128.jpg" alt="User Avatar" />
                        <div className="contacts-list-info">
                          <span className="contacts-list-name">
                            John K.
                            <small className="contacts-list-date float-right">1/27/2015</small>
                          </span>
                          <span className="contacts-list-msg">Can I take a look at...</span>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img className="contacts-list-img" src="dist/img/user8-128x128.jpg" alt="User Avatar" />
                        <div className="contacts-list-info">
                          <span className="contacts-list-name">
                            Kenneth M.
                            <small className="contacts-list-date float-right">1/4/2015</small>
                          </span>
                          <span className="contacts-list-msg">Never mind I found...</span>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="card-footer">
                <form action="#" method="post">
                  <div className="input-group">
                    <input type="text" name="message" placeholder="Type Message ..." className="form-control" />
                    <span className="input-group-append">
                      <button type="button" className="btn btn-primary">Send</button>
                    </span>
                  </div>
                </form>
              </div>
            </div>
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">
                  <i className="ion ion-clipboard mr-1" />
                  To Do List
                </h3>
                <div className="card-tools">
                  <ul className="pagination pagination-sm">
                    <li className="page-item"><a href="#" className="page-link">«</a></li>
                    <li className="page-item"><a href="#" className="page-link">1</a></li>
                    <li className="page-item"><a href="#" className="page-link">2</a></li>
                    <li className="page-item"><a href="#" className="page-link">3</a></li>
                    <li className="page-item"><a href="#" className="page-link">»</a></li>
                  </ul>
                </div>
              </div>
              <div className="card-body">
                <ul className="todo-list" data-widget="todo-list">
                  <li>
                    <span className="handle">
                      <i className="fas fa-ellipsis-v" />
                      <i className="fas fa-ellipsis-v" />
                    </span>
                    <div className="icheck-primary d-inline ml-2">
                      <input type="checkbox" defaultValue name="todo1" id="todoCheck1" />
                      <label htmlFor="todoCheck1" />
                    </div>
                    <span className="text">Design a nice theme</span>
                    <small className="badge badge-danger"><i className="far fa-clock" /> 2 mins</small>
                    <div className="tools">
                      <i className="fas fa-edit" />
                      <i className="fas fa-trash-o" />
                    </div>
                  </li>
                  <li>
                    <span className="handle">
                      <i className="fas fa-ellipsis-v" />
                      <i className="fas fa-ellipsis-v" />
                    </span>
                    <div className="icheck-primary d-inline ml-2">
                      <input type="checkbox" defaultValue name="todo2" id="todoCheck2" defaultChecked />
                      <label htmlFor="todoCheck2" />
                    </div>
                    <span className="text">Make the theme responsive</span>
                    <small className="badge badge-info"><i className="far fa-clock" /> 4 hours</small>
                    <div className="tools">
                      <i className="fas fa-edit" />
                      <i className="fas fa-trash-o" />
                    </div>
                  </li>
                  <li>
                    <span className="handle">
                      <i className="fas fa-ellipsis-v" />
                      <i className="fas fa-ellipsis-v" />
                    </span>
                    <div className="icheck-primary d-inline ml-2">
                      <input type="checkbox" defaultValue name="todo3" id="todoCheck3" />
                      <label htmlFor="todoCheck3" />
                    </div>
                    <span className="text">Let theme shine like a star</span>
                    <small className="badge badge-warning"><i className="far fa-clock" /> 1 day</small>
                    <div className="tools">
                      <i className="fas fa-edit" />
                      <i className="fas fa-trash-o" />
                    </div>
                  </li>
                  <li>
                    <span className="handle">
                      <i className="fas fa-ellipsis-v" />
                      <i className="fas fa-ellipsis-v" />
                    </span>
                    <div className="icheck-primary d-inline ml-2">
                      <input type="checkbox" defaultValue name="todo4" id="todoCheck4" />
                      <label htmlFor="todoCheck4" />
                    </div>
                    <span className="text">Let theme shine like a star</span>
                    <small className="badge badge-success"><i className="far fa-clock" /> 3 days</small>
                    <div className="tools">
                      <i className="fas fa-edit" />
                      <i className="fas fa-trash-o" />
                    </div>
                  </li>
                  <li>
                    <span className="handle">
                      <i className="fas fa-ellipsis-v" />
                      <i className="fas fa-ellipsis-v" />
                    </span>
                    <div className="icheck-primary d-inline ml-2">
                      <input type="checkbox" defaultValue name="todo5" id="todoCheck5" />
                      <label htmlFor="todoCheck5" />
                    </div>
                    <span className="text">Check your messages and notifications</span>
                    <small className="badge badge-primary"><i className="far fa-clock" /> 1 week</small>
                    <div className="tools">
                      <i className="fas fa-edit" />
                      <i className="fas fa-trash-o" />
                    </div>
                  </li>
                  <li>
                    <span className="handle">
                      <i className="fas fa-ellipsis-v" />
                      <i className="fas fa-ellipsis-v" />
                    </span>
                    <div className="icheck-primary d-inline ml-2">
                      <input type="checkbox" defaultValue name="todo6" id="todoCheck6" />
                      <label htmlFor="todoCheck6" />
                    </div>
                    <span className="text">Let theme shine like a star</span>
                    <small className="badge badge-secondary"><i className="far fa-clock" /> 1 month</small>
                    <div className="tools">
                      <i className="fas fa-edit" />
                      <i className="fas fa-trash-o" />
                    </div>
                  </li>
                </ul>
              </div>
              <div className="card-footer clearfix">
                <button type="button" className="btn btn-primary float-right"><i className="fas fa-plus" /> Add item</button>
              </div>
            </div>
          </section> */}






          {/* <section className="col-lg-5 connectedSortable">
            <div className="card bg-gradient-primary">
              <div className="card-header border-0">
                <h3 className="card-title">
                  <i className="fas fa-map-marker-alt mr-1" />
                  Visitors
                </h3>
                <div className="card-tools">
                  <button type="button" className="btn btn-primary btn-sm daterange" title="Date range">
                    <i className="far fa-calendar-alt" />
                  </button>
                  <button type="button" className="btn btn-primary btn-sm" data-card-widget="collapse" title="Collapse">
                    <i className="fas fa-minus" />
                  </button>
                </div>
              </div>
              <div className="card-body">
                <div id="world-map" style={{height: 250, width: '100%'}} />
              </div>
              <div className="card-footer bg-transparent">
                <div className="row">
                  <div className="col-4 text-center">
                    <div id="sparkline-1" />
                    <div className="text-white">Visitors</div>
                  </div>
                  <div className="col-4 text-center">
                    <div id="sparkline-2" />
                    <div className="text-white">Online</div>
                  </div>
                  <div className="col-4 text-center">
                    <div id="sparkline-3" />
                    <div className="text-white">Sales</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card bg-gradient-info">
              <div className="card-header border-0">
                <h3 className="card-title">
                  <i className="fas fa-th mr-1" />
                  Sales Graph
                </h3>
                <div className="card-tools">
                  <button type="button" className="btn bg-info btn-sm" data-card-widget="collapse">
                    <i className="fas fa-minus" />
                  </button>
                  <button type="button" className="btn bg-info btn-sm" data-card-widget="remove">
                    <i className="fas fa-times" />
                  </button>
                </div>
              </div>
              <div className="card-body">
                <canvas className="chart" id="line-chart" style={{minHeight: 250, height: 250, maxHeight: 250, maxWidth: '100%'}} />
              </div>
              <div className="card-footer bg-transparent">
                <div className="row">
                  <div className="col-4 text-center">
                    <input type="text" className="knob" data-readonly="true" defaultValue={20} data-width={60} data-height={60} data-fgcolor="#39CCCC" />
                    <div className="text-white">Mail-Orders</div>
                  </div>
                  <div className="col-4 text-center">
                    <input type="text" className="knob" data-readonly="true" defaultValue={50} data-width={60} data-height={60} data-fgcolor="#39CCCC" />
                    <div className="text-white">Online</div>
                  </div>
                  <div className="col-4 text-center">
                    <input type="text" className="knob" data-readonly="true" defaultValue={30} data-width={60} data-height={60} data-fgcolor="#39CCCC" />
                    <div className="text-white">In-Store</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card bg-gradient-success">
              <div className="card-header border-0">
                <h3 className="card-title">
                  <i className="far fa-calendar-alt" />
                  Calendar
                </h3>
                <div className="card-tools">
                  <div className="btn-group">
                    <button type="button" className="btn btn-success btn-sm dropdown-toggle" data-toggle="dropdown" data-offset={-52}>
                      <i className="fas fa-bars" />
                    </button>
                    <div className="dropdown-menu" role="menu">
                      <a href="#" className="dropdown-item">Add new event</a>
                      <a href="#" className="dropdown-item">Clear events</a>
                      <div className="dropdown-divider" />
                      <a href="#" className="dropdown-item">View calendar</a>
                    </div>
                  </div>
                  <button type="button" className="btn btn-success btn-sm" data-card-widget="collapse">
                    <i className="fas fa-minus" />
                  </button>
                  <button type="button" className="btn btn-success btn-sm" data-card-widget="remove">
                    <i className="fas fa-times" />
                  </button>
                </div>
              </div>
              <div className="card-body pt-0">
                <div id="calendar" style={{width: '100%'}} />
              </div>
            </div>
          </section>

 */}




        </div>
      </div>
    </section>
  </div>
</div>

  )
}

export default Dashboard
