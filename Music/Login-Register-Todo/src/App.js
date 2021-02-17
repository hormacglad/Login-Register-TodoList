import React,{ useState } from 'react'
import Register from './Register'
import Login from './Login'
import Dashboard from  './Dashboard'
// import axios from 'axios'
import './App.css'


function App() {

  const [user, setUser] = useState("")
  const [form, setForm] = useState(localStorage.getItem("state")?localStorage.getItem("state"):"login");
  const [userId, setUserID] = useState(null)
  const [todos, setTodos] = useState([])
  
  
return (
  <div>

  {
      form==='login'?(
      <div className="login-wrap">
      <div className="login-html">
    
          <input id="tab-1" type="radio" name="tab" onChange={()=>{}} className="sign-in" checked/>
              <label htmlFor="tab-1" className="tab">Log In</label>
          <input id="tab-2" type="radio" name="tab" onChange={()=>{}}  className="sign-up"/>
              <label htmlFor="tab-2" className="tab">Register</label>
          <div className="login-form">
             <Login changeForm = {setForm} changeUser={setUser} changeUserID = {setUserID}></Login>
             <Register changeForm = {setForm} changeUser={setUser} changeUserID = {setUserID}></Register>
          </div>
      </div>
     </div>
    ): <Dashboard changeForm = {setForm} user={localStorage.getItem("name")} userId = {userId}></Dashboard>
  }
 
  
  </div>
);
}

export default App;