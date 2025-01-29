import React from 'react'
import Navbar from '../components/Navbar'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify'

const Dashboard = () => {
  //declaration
  let auth = localStorage.getItem('auth');
  let role = localStorage.getItem('frole');
  let [data, setData] = useState({});
  let [team, setTeam] = useState([]);
  let [task, setTask] = useState([]);
  const navigate  = useNavigate();

  //handle error
  const handlerror = (message) => toast.error(message, {
    position: 'top-right',
    autoClose: 3000,
    style: {
      color: '#000',
      padding: '10px',
      borderRadius: '5px',
    }
  })
  
  //handle success
  const handlesuccess = (message) => toast.success(message, {
    position: 'top-right',
    autoClose: 3000,
    style: {
      color: '#000',
      padding: '10px',
      borderRadius: '5px',
    }
  })

  //useeffect
  useEffect(() => {
    axios.post("http://localhost:3000/dashboard",{auth,role}).then((res) => {
      if(res.data.success == true){
        setData(res.data.userda);
        setTeam(res.data.userda.teammember);
        setTask(res.data.userda.task);
      }else{
        handlerror(res.data.message);
        setTimeout(() => {
          if(res.data.message == 'Token not found' || res.data.message == 'user not found'){
            navigate('/login')
          }
        }, 3000);
      }
    })
  })

  //to show page
  const toshow = (id) => {
    navigate(`/show/${id}`)
  }  
  const showmemberdata = (id) => {
    navigate(`/member/${id}`)
  }  

  if(role == "admin"){
    return (
      <div>
        <Navbar />
        <div className="row">
          <div className="col-10 offset-1 form-box Color2 mt-3">
            <h1 className='form-heading'>{data.fullname}</h1>
            <p className='m-2'><b>Email: </b>{data.email}</p>
            <p className='m-2'><b>Role: </b>{data.title}</p>
          </div>
        </div>
        <div className="row mt-3">
        <div className="col-10 offset-1 mt-3">
          <h1>Task</h1>
        <table class="table Color2">
            <thead>
              <tr>
                <th scope="col">Topic</th>
                <th scope="col">Status</th>
                <th scope="col">Priority</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>
                {
                  task.map((el) => {
                    return(
                      <tr onClick={() => toshow(el._id)}>
                        <td>{el.topic}</td>
                        <td>{el.status}</td>
                        <td>{el.priority}</td>
                        <td>{el.date}</td>
                      </tr>
                    )
                  })
                }
            </tbody>
          </table>
        </div>
        </div>
        <div className="row mt-3">
        <div className="col-10 offset-1 mt-3">
          <h1>Team Member</h1>
        <table class="table Color2">
            <thead>
              <tr>
                <th scope="col">Full name</th>
                <th scope="col">Title</th>
                <th scope="col">Email</th>
              </tr>
            </thead>
            <tbody>
                {
                  team.map((el) => {
                    return(
                      <tr onClick={() => showmemberdata(el._id)}>
                        <td>{el.fullname}</td>
                        <td>{el.title}</td>
                        <td>{el.email}</td>
                      </tr>
                    )
                  })
                }
            </tbody>
          </table>
        </div>
        </div>
        <ToastContainer/>
      </div>
    )
  }else{
    return (
      <div>
        <Navbar />
        <div className="row">
          <div className="col-10 offset-1 form-box Color2 mt-3">
            <h1 className='form-heading'>{data.fullname}</h1>
            <p className='m-2'><b>Email: </b>{data.email}</p>
            <p className='m-2'><b>Role: </b>{data.title}</p>
          </div>
        </div>
        <div className="row mt-3">
        <div className="col-10 offset-1 mt-3">
        <table class="table Color2">
            <thead>
              <tr>
                <th scope="col">Topic</th>
                <th scope="col">Status</th>
                <th scope="col">Priority</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>
                {
                  task.map((el) => {
                    return(
                      <tr onClick={() => toshow(el._id)}>
                        <td>{el.topic}</td>
                        <td>{el.status}</td>
                        <td>{el.priority}</td>
                        <td>{el.date}</td>
                      </tr>
                    )
                  })
                }
            </tbody>
          </table>
        </div>
        <ToastContainer/>
        </div>
      </div>
    )
  }
}

export default Dashboard
