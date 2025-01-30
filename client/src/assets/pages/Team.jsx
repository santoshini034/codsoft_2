import React from 'react'
import Navbar from "../components/Navbar"
import { useState, useEffect } from 'react'
import {ToastContainer, toast} from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Team = () => {
  //declaration
const [addmember, setAddmember] = useState(false);
const [email, setEmail] = useState("");
const [teamdata, setTeamdata] = useState([]);
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
  axios.post("https://codsoft-2-backend.onrender.com/teampage",{auth, role}).then((res) => {
    if(res.data.success == true){
      setTeamdata(res.data.adm.teammember);
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
  setAddmember(true)
}

//handle submit to add member
const handleSubmit =(e) => {
  e.preventDefault();
  if(email == ""){
    handlerror("Enter email id");
  }else{
    axios.post('https://codsoft-2-backend.onrender.com/addmember',{auth,role,email}).then((res) => {
      if(res.data.success == true){
        handlesuccess(res.data.message);
        setTeamdata(res.data.admi.teammember);
        setEmail("")
        setTimeout(() => {
          setAddmember(false);
        }, 3000);
      }else{
        handlerror(res.data.message)
      }
    })
  }
}

if (!addmember) {
  return (
    <div>
      <Navbar/>
      <button className='btn btn-primary m-3' onClick={create}>Add members</button>
      <div className="row">
        <div className="col-10 offset-1">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Full Name</th>
                <th scope="col">Title</th>
                <th scope="col">Email</th>
              </tr>
            </thead>
            <tbody>
                {
                  teamdata.map((el) => {
                    return(
                      <tr>
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
    </div>
  )
}else{
  return (
    <div>
      <Navbar/>
      <div className="row">
        <div className="col-6 offset-3 Color2 form-box">
          <h1 className='form-heading' >Add members</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className='form-label'>Email:</label>
              <input type="email" id='email' className='form-control' autoComplete='off' value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <button className='btn btn-success m-3'>Add</button>
          </form>
        </div>
      </div>
      <ToastContainer/>
    </div>
  )
}

}

export default Team
