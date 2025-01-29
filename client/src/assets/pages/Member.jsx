import React from 'react'
import Navbar from '../components/Navbar'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {ToastContainer, toast} from 'react-toastify'

const Show = () => {
  //declaration
  const {id} = useParams()
  let auth = localStorage.getItem('auth');
  let role = localStorage.getItem('frole');
  let [data, setData] = useState({});
  let [task, setTask] = useState();
  const navigate = useNavigate();

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

  //useEffect
  useEffect(() => {
    axios.post(`http://localhost:3000/member/${id}`,{auth,role}).then((res) => {
      if(res.data.success == true){
        setData(res.data.member);
        setTask(res.data.member.task);
      }else{
        handlerror(res.data.message);
        setTimeout(() => {
          if(res.data.message == 'Token not found' || res.data.message == 'user not found'){
            navigate('/login')
          }
        }, 3000);
      }
    })
  },[])


  return (
    <div>
      <Navbar />
      <div className="row m-4">
        <div className="col-10 offset-1 Color2 form-box">
          <h1 className='form-heading'>{data.fullname}</h1>
          <p className='m-3'><b>Email: </b> {data.email}</p>
          <p className='m-3'><b>Role: </b> {data.title}</p>
          <p className='m-3'><b>Date: </b> {data.date}</p>
        </div>
      </div>
      <ToastContainer/>
      <hr />
      {
         task.map((el) => {
            return(
              <Cards topic = {el.topic} status = {el.status} priority = {el.priority} team = {el.team} date = {el.date} description = {el.description} id = {el._id}/>
            )
         })
       }
    </div>
  )
}

export default Show
