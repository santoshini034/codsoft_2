import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Cards = ({topic, status, priority, team, date, description, id}) => {
 //declaration
 const [steam, setSTeam]=useState([]);
 let auth = localStorage.getItem('authToken');
let role = localStorage.getItem('frole')
const navigate = useNavigate()


 //useeffect
 useEffect(() =>{
    axios.post("http://localhost:3000/cards",{team}).then((res) => {
        setSTeam(res.data.userarr);
    })
 },[])


 //to show page
 const toshow = (id) => {
    navigate(`/show/${id}`)
  }

  
  return (
        <div className="outer" onClick={() => toshow(id)}>
            <div class="cards Color2  m-3 p-2 form-box">
                <h4 className='form-heading p-2'>{topic}</h4>
                <h5 className='ps-3 bgred'>{priority}</h5>
                <p className='ps-3'>{description}</p>
                <p className='m-1'><b>Team</b></p>
                {
                    steam.map((el) => {
                        return(
                            <p>{el.fullname}</p>
                        )
                    })
                }
                <span className='p-1 bgred'>{status}</span>
                <span className='p-1'>{date}</span>
            </div>
        </div>
  )
}

export default Cards
