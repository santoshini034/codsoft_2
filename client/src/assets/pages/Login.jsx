import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast} from 'react-toastify'

const Login = () => {
  //declaration
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
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


  //handle submit
  const handlesubmit = (e) => {
    e.preventDefault();
    if(email == "" || password == ""){
      handlerror("Enter valid credentials")
    }else{
      try {
        axios.post("http://localhost:3000/login",{role, email, password}).then((res) => {
          if(res.data.success == true){
            localStorage.setItem('auth', res.data.token);
            localStorage.setItem('frole', res.data.role);
            handlesuccess(res.data.message);
            setTimeout(() => {
              navigate('/dashboard')
            }, 3000);
          }else{
            handlerror(res.data.message);
          }
        })
      } catch (error) {
        handlerror("some error occur, try again");
      }
    }
  }

  return (
    <div>
      <div className="row">
        <div className="col-8 offset-2 mt-5 Color2 form-box">
          <h1 className='form-heading'>Login</h1>
          <form onSubmit={handlesubmit}>
            <div className="mb-3">
              <label htmlFor="email" className='form-label'>Email:</label>
              <input type="email" className='form-control' id='email' placeholder='Enter email id' autoComplete='off' value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div class="mb-3">
                <label for="role" class="form-label">Role:</label>
                <select class="form-select" id='role' value={role} onChange={(e) => {setRole(e.target.value)}} >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>
            <div className="mb-3">
              <label htmlFor="password" className='form-label'>Password:</label>
              <input type="password" className='form-control' id='password' placeholder='Enter password' autoComplete='off' value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <button className='btn btn-primary m-3'>submit</button>
          </form>
          <p className='p-2'>Not registered? <a href="/signin">Register</a></p>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Login
