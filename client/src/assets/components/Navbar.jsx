import React from 'react'
import { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import {ToastContainer, toast} from 'react-toastify'

const Navbar = () => {
  //declaration
  const navigate = useNavigate();
  const usertype = localStorage.getItem('frole')

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


  if(usertype == "user"){
    return (
      <div>
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
          <div class="container-fluid">
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
                  <a class="navbar-brand" href="#"><b>Project<span className='bgblue'>Manager</span></b></a>
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                      <li class="nav-item">
                          <a class="nav-link" aria-current="page" href="/dashboard">Dashboard</a>
                      </li>
                      <li class="nav-item">
                          <a class="nav-link" aria-current="page" href="/task">Task</a>
                      </li>
                      <li class="nav-item">
                          <a class="nav-link" aria-current="page" href="/completed">Completed</a>
                      </li>
                      <li class="nav-item">
                          <a class="nav-link" aria-current="page" href="/inprogress">Inprogress</a>
                      </li>
                      <li class="nav-item">
                          <a class="nav-link" aria-current="page" href="/todo">Todo</a>
                      </li>
                    </ul>
                  <form class="d-flex" role="search">
                      <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                      <button class="btn btn-outline-success" type="submit">Search</button>
                  </form>
              </div>
          </div>
        </nav>
        <ToastContainer/>
      </div>
    )
  }else{
    return (
      <div>
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
          <div class="container-fluid">
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
                  <a class="navbar-brand" href="#"><b>Project<span className='bgblue'>Manager</span></b></a>
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                      <li class="nav-item">
                          <a class="nav-link" aria-current="page" href="/dashboard">Dashboard</a>
                      </li>
                      <li class="nav-item">
                          <a class="nav-link" aria-current="page" href="/task">Task</a>
                      </li>
                      <li class="nav-item">
                          <a class="nav-link" aria-current="page" href="/completed">Completed</a>
                      </li>
                      <li class="nav-item">
                          <a class="nav-link" aria-current="page" href="/inprogress">Inprogress</a>
                      </li>
                      <li class="nav-item">
                          <a class="nav-link" aria-current="page" href="/todo">Todo</a>
                      </li>
                      <li class="nav-item">
                          <a class="nav-link" aria-current="page" href="/team">Team</a>
                      </li>
                    </ul>
                  <form class="d-flex" role="search">
                      <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                      <button class="btn btn-outline-success" type="submit">Search</button>
                  </form>
              </div>
          </div>
        </nav>
        <ToastContainer/>
      </div>
    )
  }

  
}

export default Navbar
