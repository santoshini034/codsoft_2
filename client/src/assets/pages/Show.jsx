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
  let [team, setTeam] = useState([]);
  let [datacomment, setDatacomment] = useState([]);
  let [status, setStatus] = useState("complete");
  let [comment, setComment] = useState("");
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
    axios.post(`https://codsoft-2-backend.onrender.com/show/${id}`,{auth,role}).then((res) => {
      console.log(res)
      if(res.data.success == true){
        setData(res.data.taskdata);
        setTeam(res.data.taskdata.team);
        setDatacomment(res.data.taskdata.comment);
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

  //handlesubmit
  const handleSubmit = () => {
    axios.post(`https://codsoft-2-backend.onrender.com/status/${id}`,{auth, role, comment, status}).then((res) => {
      if(res.data.success == true){
        console.log(res.data.taskdata);
        setData(res.data.taskdata);
        setTeam(res.data.taskdata.team);
        setDatacomment(res.data.taskdata.comment);
      }else{
        handlerror(res.data.message);
        setTimeout(() => {
          if(res.data.message == 'Token not found' || res.data.message == 'user not found'){
            navigate('/login')
          }
        }, 3000);
      }
    })
  }

  return (
    <div>
      <Navbar />
      <div className="row m-4">
        <div className="col-10 offset-1 Color2 form-box">
          <h1 className='form-heading'>{data.topic}</h1>
          <p className='m-3'><b>Status: </b> {data.status}</p>
          <p className='m-3'><b>Priority: </b> {data.priority}</p>
          <p className='m-3'><b>Date: </b> {data.date}</p>
          <p className='m-3'><b>Description: </b></p>
          <p className='m-3'>{data.description}</p>
          <p className='m-3'><b>Team: </b></p>
          {
            team.map((el) => {
              return(
                <p className='m-4'>{el.fullname}</p>
              )
            })
          }
        </div>
      </div>
      <ToastContainer/>
      <hr />
      <div className="row">
        <div className="col-6 offset-3 Color2 form-box">
          <h1 className='form-heading'>Update Status</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
               <label htmlFor="comment" className='form-label'>Comment:</label>
               <input type="text" id='comment' className='form-control' autoComplete='off' value={comment} onChange={(e) => setComment(e.target.value)} />
            </div>
            <div class="mb-3">
              <label for="status" class="form-label">Status:</label>
              <select class="form-select" id='status' value={status} onChange={(e) => {setStatus(e.target.value)}} >
                <option value="complete">Completed</option>
                <option value="inprogress">In progress</option>
                <option value="todo">To do</option>
              </select>
            </div>
            <button className='btn btn-success m-3'>submit</button>
          </form>
          <hr />
          {
            datacomment.map((el) => {
              return(
                <p>{el}</p>
              )
            })
          }
        </div>
        </div>
    </div>
  )
}

export default Show
