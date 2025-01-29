import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./assets/pages/Login"
import Signin from './assets/pages/Signin'
import Dashboard from './assets/pages/Dashboard'
import Completed from './assets/pages/Completed'
import Inprogress from './assets/pages/Inprogress'
import Task from './assets/pages/Task'
import Team from './assets/pages/Team'
import Todo from './assets/pages/Todo'
import 'react-toastify/dist/ReactToastify.css';
import Show from './assets/pages/Show';
import Member from './assets/pages/Member';

function App() {

  return (
    <div className='Color1 body'>
      <Router>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signin" element={<Signin/>} />
          <Route path="/completed" element={<Completed/>} />
          <Route path="/inprogress" element={<Inprogress/>} />
          <Route path="/task" element={<Task/>} />
          <Route path="/team" element={<Team/>} />
          <Route path="/todo" element={<Todo/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/show/:id" element={<Show/>} />
          <Route path="/member/:id" element={<Member/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App