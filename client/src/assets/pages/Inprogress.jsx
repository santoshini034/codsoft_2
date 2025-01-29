import React from 'react'
import Navbar from '../components/Navbar'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cards from '../components/Cards'
import { useNavigate } from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify'

const Inprogress = () => {
  //declaration
  let auth = localStorage.getItem('auth');
  let role = localStorage.getItem('frole');
  let [task, setTask] = useState([]);
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

  //useeffect
  useEffect(() => {
    axios.post("http://localhost:3000/dashboard",{auth,role}).then((res) => {
      if(res.data.success == true){
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

  
if(role == "admin"){
   return(
     <div>
       <Navbar/>
       {
         task.map((el) => {
          if(el.status == "inprogress"){
            return(
              <Cards topic = {el.topic} status = {el.status} priority = {el.priority} team = {el.team} date = {el.date} description = {el.description} id = {el._id}/>
            )
          }
         })
       }
       <ToastContainer/>
     </div>
   )
 }else{
   return(
     <div>
       <Navbar/>
       {
         task.map((el) => {
          if(el.status == "inprogress"){
            return(
              <Cards topic = {el.topic} status = {el.status} priority = {el.priority} team = {el.team} date = {el.date} description = {el.description} id = {el._id}/>
            )
          }
         })
       }
       <ToastContainer/>
     </div>
   )
 }
}

export default Inprogress
