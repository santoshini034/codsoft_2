import React from 'react'
import Navbar from "../components/Navbar"
import { useState, useEffect } from 'react'
import {ToastContainer, toast} from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Cards from "../components/Cards"

const Task = () => {
  //declaration
const [addtask, setAddtask] = useState(false);
const [topic, setTopic] = useState("");
const [status, setStatus] = useState("complete");
const [priority, setPriority] = useState("high");
const [description, setDescription] = useState("");
const [team, setTeam] = useState([]);
const [data, setData] = useState({});
const [dteam, setDteam] = useState([]);
const [dtask, setDtask] = useState([]);
let auth = localStorage.getItem('auth');
let role = localStorage.getItem('frole')
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
  axios.post("https://codsoft-2-backend.onrender.com/taskpage",{auth, role}).then((res) => {
    if(res.data.success == true){
      setData(res.data.userda);
      setDteam(res.data.userda.teammember);
      setDtask(res.data.userda.task);
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

//create button functionality
const create = () => {
  setAddtask(true)
}

//handle submit to add member
const handleSubmit =(e) => {
  e.preventDefault();
  if(topic == "" || status == "" ||priority == "" || team == []){
    handlerror("Enter valid credentials");
  }else{
    axios.post('https://codsoft-2-backend.onrender.com/addtask',{auth, role, team, topic, status, priority, description}).then((res) => {
      console.log(res);
      if(res.data.success == true){
        handlesuccess(res.data.message);
        setData(res.data.userda);
        setDteam(res.data.userda.teammember);
        setDtask(res.data.userda.task);
        setTopic("")
        setTimeout(() => {
          setAddtask(false);
        }, 3000);
      }else{
        handlerror(res.data.message)
        setTimeout(() => {
          if(res.data.message == 'Token not found' || res.data.message == 'user not found'){
            navigate('/login')
          }
        }, 3000);
      }
    })
  }
}

if(role == "admin"){
 if(!addtask){
  return(
    <div>
      <Navbar/>
      <button className='btn btn-success m-3' onClick={create}>Add task</button>
      <hr />
      {
        dtask.map((el) => {
          return(
            <Cards topic = {el.topic} status = {el.status} priority = {el.priority} team = {el.team} date = {el.date} description = {el.description} id = {el._id}/>
          )
        })
      }
      <ToastContainer/>
    </div>
  )
 }else{
    return(
    <div>
      <Navbar/>
      <button className='btn btn-success m-3'>Add task</button>
      <div className="row">
        <div className="col-6 offset-3 Color2 form-box">
          <h1 className='form-heading'>Create task</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
               <label htmlFor="topic" className='form-label'>Topic:</label>
               <input type="text" id='topic' className='form-control' autoComplete='off' value={topic} onChange={(e) => setTopic(e.target.value)} />
            </div>
            <div class="mb-3">
                <label for="description" class="form-label">Enter Description:</label>
                <textarea class="form-control" id="description" rows="3" autoComplete='off' value={description} onChange={(e) => {setDescription(e.target.value)}}></textarea>
              </div>
            <div class="mb-3">
              <label for="status" class="form-label">Status:</label>
              <select class="form-select" id='status' value={status} onChange={(e) => {setStatus(e.target.value)}} >
                <option value="completed">Completed</option>
                <option value="inprogress">In progress</option>
                <option value="todo">To do</option>
              </select>
            </div>
            <div class="mb-3">
              <label for="priority" class="form-label">Priority:</label>
              <select class="form-select" id='priority' value={priority} onChange={(e) => {setPriority(e.target.value)}} >
                <option value="high">High</option>
                <option value="medium">medium</option>
                <option value="less">less</option>
              </select>
            </div>
            {dteam.map((option) => {
              return(
                  <div>
                  <label key={option.email}>
                    <input type="checkbox" className='form-check-input' name={option.email}
                    onChange={() => setTeam([...team, option.email])}
            />
            {option.email}
          </label>
                  </div>
              )
            })}
            <button className='btn btn-success m-3'>submit</button>
          </form>
        </div>
      </div>
      <ToastContainer/>
    </div>
    )
 }
}else{
  return(
    <div>
      <Navbar/>
      {
        dtask.map((el) => {
          return(
            <Cards topic = {el.topic} status = {el.status} priority = {el.priority} team = {el.team} date = {el.date} description = {el.description} id = {el._id}/>
          )
        })
      }
      <ToastContainer/>
    </div>
  )
}
}

export default Task
