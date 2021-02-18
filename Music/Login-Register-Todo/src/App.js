// import React,{ useState } from 'react'
import Register from './Register'
import Login from './Login'
import Dashboard from './Dashboard'
import axios from 'axios'
import './App.css'
import React, { Component } from 'react'

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //   const [user, setUser] = useState("")
      //   const [form, setForm] = useState(localStorage.getItem("state")?localStorage.getItem("state"):"login");
      //   const [userId, setUserID] = useState(null)
      //   const [todos, setTodos] = useState([])
      user: "",
      username: "",
      error_message: "",
      password: "",
      form: localStorage.getItem("state") ? localStorage.getItem("state") : "login",
      userId: "",
      todos: []

    }
  }

  handleUsernameChange = (event) => {
    const { value } = event.target
    this.setState({ ...this.state, username: value });
  }

  handlePasswordChange = (event) => {
    const { value } = event.target
    this.setState({ ...this.state, password: value });
  }

  handleSubmitButton = async () => {
    const { username, password } = this.state
    const username_password = {
      username,
      password
    }
    if (username !== "" && password !== "") {
      try {
        const event = await axios.post('/login', username_password)
        console.log(event.data.Type, event.data.Message)
        if (event.data.Type === "Success") {
          console.log(event.data.Message);
          console.log(event.data.Payload.id, "PPPPPPP");
          localStorage.setItem("state", "dashboard");
          localStorage.setItem("name", username);
          localStorage.setItem("userId", event.data.Payload.id);
          this.setState({ ...this.state, userId: event.data.Payload.id, form: "dashboard", user: username })
          // props.changeUserID(event.data.Payload.id)
          // props.changeForm("dashboard");
          // props.changeUser(username);    
        } else {
          // setError("Credentials Not Found!");
          this.setState({ ...this.state, error_message: "Credentials Not Found!" })
        }
      } catch (error) {
        this.setState({ ...this.state, error_message: "Credentials Not Found!" })
      }
    } else {
      this.setState({ ...this.state, error_message: "Invalid! Empty Input" })
      // setError("Invalid! Empty Input");


    }
  }

  handleLogoutButton = () => {
    localStorage.setItem("state", "login");
    localStorage.setItem("name", null);
    localStorage.setItem("userId", null)
    // this.props.changeForm("login");
    // this.setState({...this.state, form:"login"})
    // this.setState({...this.state, form: "login"})
    this.setState({...this.state, form:"login"})
    console.log(this.state.form);
  }
  
  render() {
    const { form } = this.state
    return (
      <div>
        {
          form === 'login' ? (
            <div className="login-wrap">
              <div className="login-html">

                <input id="tab-1" type="radio" name="tab" onChange={() => { }} className="sign-in" checked />
                <label htmlFor="tab-1" className="tab">Log In</label>
                <input id="tab-2" type="radio" name="tab" onChange={() => { }} className="sign-up" />
                <label htmlFor="tab-2" className="tab">Register</label>
                <div className="login-form">
                  <Login
                    // changeForm={this.state.form}
                    // changeUser={this.state.user}
                    // changeUserID={this.state.userId}
                    // data = {this.state}
                    error_message={this.state.error_message}
                    handleUsernameChange={this.handleUsernameChange}
                    handlePasswordChange={this.handlePasswordChange}
                    handleSubmitButton={this.handleSubmitButton}
                  />

                  {/* <Register
                    changeForm={this.state.form} 
                    changeUser={this.state.user} 
                    changeUserID={this.state.userId}
                    handleUsernameChange={this.handleUsernameChange}
                    handlePasswordChange={this.handlePasswordChange}
                    /> */}
                </div>
              </div>
            </div>
          ) : <Dashboard
            handleLogoutButton={this.handleLogoutButton}
            user={localStorage.getItem("name")}
            userId={this.state.userId}></Dashboard>
        }
      </div>
    )
  }
}

export default App







// function App() {

//   const [user, setUser] = useState("")
//   const [form, setForm] = useState(localStorage.getItem("state")?localStorage.getItem("state"):"login");
//   const [userId, setUserID] = useState(null)
//   const [todos, setTodos] = useState([])


// return (
//   <div>

//   {
//       form==='login'?(
//       <div className="login-wrap">
//       <div className="login-html">

//           <input id="tab-1" type="radio" name="tab" onChange={()=>{}} className="sign-in" checked/>
//               <label htmlFor="tab-1" className="tab">Log In</label>
//           <input id="tab-2" type="radio" name="tab" onChange={()=>{}}  className="sign-up"/>
//               <label htmlFor="tab-2" className="tab">Register</label>
//           <div className="login-form">
//              <Login changeForm = {setForm} changeUser={setUser} changeUserID = {setUserID}></Login>
//              <Register changeForm = {setForm} changeUser={setUser} changeUserID = {setUserID}></Register>
//           </div>
//       </div>
//      </div>
//     ): <Dashboard changeForm = {setForm} user={localStorage.getItem("name")} userId = {userId}></Dashboard>
//   }


//   </div>
// );
// }

// export default App;