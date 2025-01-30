import React from 'react'
import { useState } from 'react'
import {ToastContainer, toast} from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Signin = () => {
    //declaration
    const [fullname,setFullname] = useState("")
    const [email, setEmail] = useState("")
    const [title,setTitle] = useState("")
    const [role, setRole] = useState("admin")
    const [password, setPassword] = useState("")
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

    //handlesubmit
    const handlesubmit = async(e) => {
        e.preventDefault();
        if(fullname == "" || email == "" || title == "" || role == "" || password == ""){
            handlerror("enter valid credentials");
        }else{
            try {
                axios.post("https://codsoft-2-backend.onrender.com/signin",{role, fullname, email, title, password}).then((res) => {
                    if(res.data.success == true){
                        localStorage.setItem('auth', res.data.token);
                        localStorage.setItem('frole', res.data.role);
                        handlesuccess(res.data.message);
                        setTimeout(() => {
                            navigate("/dashboard");
                        }, 3000);
                    }else{
                        handlerror(res.data.message)
                    }
                })
            } catch (error) {
                handlerror("Some error occur, try again")
            }
        }
    }


  return (
    <div className='row'>
        <div className="col-8 offset-2 mt-5 form-box Color2">
            <h1 className='m-2 form-heading'>Signin</h1>
            <form onSubmit={handlesubmit}>
                <div class="mb-3">
                    <label for="fullname" class="form-label">Full name</label>
                    <input type="text" class="form-control" id="fulname" placeholder="Enter full name" autoComplete='off' value={fullname} onChange={(e) => setFullname(e.target.value)}/>
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Email:</label>
                    <input type="email" class="form-control" id="email" placeholder="Enter Email id" autoComplete='off' value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div class="mb-3">
                    <label for="title" class="form-label">Title:</label>
                    <input type="text" class="form-control" id="title" placeholder="Enter title" autoComplete='off' value={title} onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <div class="mb-3">
                <label for="role" class="form-label">Role:</label>
                <select class="form-select" id='role' value={role} onChange={(e) => {setRole(e.target.value)}} >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" class="form-control" id="password" placeholder="Enter password" autoComplete='off' value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button className='btn btn-success m-4'>submit</button>
            </form>
        </div>
        <ToastContainer/>
    </div>
  )
}

export default Signin
