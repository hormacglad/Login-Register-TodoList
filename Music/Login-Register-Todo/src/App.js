import React, { Component } from 'react'
import Register from './Register'
import Login from './Login'
import Dashboard from './Dashboard'
import axios from 'axios'
import './App.css'
import validator from 'validator'


export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      login_email: "",
      login_password: "",
      login_error_message: "",
      form: localStorage.getItem("state") ? localStorage.getItem("state") : "form",
      change_form:localStorage.getItem("change_form") ? localStorage.getItem("change_form") : "login",
      registerEmail: "",
      registerPassword: "",
      register_error_message:"",
      confirmPassword: "",
      userId: "",
      todos: []

    }
  }

  handleLoginEmailChange = (event) => {
    const { value } = event.target
    this.setState({ login_email: value });
  }

  handleLoginPasswordChange = (event) => {
    const { value } = event.target
    this.setState({ login_password: value });
  }

  handleLoginSubmitButton = async () => {
    const { login_email, login_password } = this.state
    const username_password = {
      login_email,
      login_password
    }
    if (login_email !== "" && login_password !== "") {
      try {
        const event = await axios.post('/login', username_password)
        console.log(event.data.Type, event.data.Message)
        if (event.data.Type === "Success") {
          console.log(event.data.Message);
          console.log(event.data.Payload.id, "PPPPPPP");
          localStorage.setItem("state", "dashboard");
          localStorage.setItem("name", login_email);
          localStorage.setItem("userId", event.data.Payload.id);
          this.setState({ ...this.state, userId: event.data.Payload.id, form: "dashboard", user: login_email,  error_message:'' })   
        } else {
          this.setState({ ...this.state, error_message: "Credentials Not Found!" })
        }
      } catch (error) {
        this.setState({ ...this.state, error_message: "Credentials Not Found!" })
      }
    } else {
      this.setState({ ...this.state, error_message: "Invalid! Empty Input" })
    }
  }

  handleRegisterEmailChange = (event) => {
    const { value } = event.target
    this.setState({ ...this.state, registerEmail: value });
  }

  handleRegisterPasswordChange = (event) => {
    const { value } = event.target
    this.setState({ ...this.state, registerPassword: value });
  }

  handleConfirmPassword = (event) => {
    const { value } = event.target
    this.setState({ ...this.state, confirmPassword: value });
  }

  handleRegisterSubmitButton = async () => {
    console.log("register");
    const { registerEmail, registerPassword, confirmPassword } = this.state
    // if(validator.isEmail(registerUsername)){
    //   console.log("email is valid");
    // }else{
    //   console.log("not valid");
    // }
    const username_password = {
      registerEmail,
      registerPassword
    }
    if (registerEmail !== "" && registerPassword !== "" && registerPassword === confirmPassword) {
      console.log("I am here");
      if(validator.isEmail(registerEmail)){
        console.log("Valid Email");
      try {
        const event = await axios.post('/register', username_password)
        console.log(event)
        if (event.data.Type === "Success") {
          localStorage.setItem("state", "dashboard");
          localStorage.setItem("name", registerEmail);
          localStorage.setItem("userId", event.data.Payload.generated_keys[0]);
          this.setState({ ...this.state, userId: event.data.Payload.id, form: "dashboard", user: registerEmail, register_error_message:''})
        } else {
          console.log('error', event.data.Message)
          this.setState({ ...this.state, register_error_message: "Registration Error!" })
        }
      } catch (error) {
        console.log('error', error)
        this.setState({ ...this.state, register_error_message: "Registration Error!" })
      }
    }else{
      this.setState({ ...this.state, register_error_message: "Invalid Email!" })
    }
    }
    
    else {
      if (registerEmail === "" && registerPassword === "") {
        this.setState({ ...this.state, register_error_message: "Input Fields are Required!" })
      }
      if (registerPassword !== confirmPassword) {
        this.setState({ ...this.state, register_error_message: "Please verify your password!" })
      }
    }
  }

  handleLogoutButton = () => {
    localStorage.setItem("state", "form");
    localStorage.setItem("name", null);
    localStorage.setItem("userId", null)
    this.setState({ ...this.state, form: "form" })
    console.log(this.state.form);
  }

  handleChangeForm = (data) => {
    console.log('%c 🍾 data: ', 'font-size:20px;background-color: #FFDD4D;color:#fff;', data); 
    this.setState({ ...this.state, change_form: data })
    localStorage.setItem("change_form",data)
    // if(data==="login"){
    //   // console.log(this.state.registerUsername," ", this.state.registerPassword);
    //   this.setState({ ...this.state, registerUsername:'registerUser', registerPassword:'registerPass',  change_form: data  })
    //   console.log(this.state.registerUsername);
    //   // console.log(this.state.registerUsername," ", this.state.registerPassword);
    // }else{
    //   this.setState({ ...this.state, loginUsername:'', loginPassword:'',  change_form: data  })  
    //   console.log(this.state.change_form);
    // }
  }
  render() {
    const { form, change_form } = this.state
    const change_form_signin = change_form==="login"?"true":""
    const change_form_register = change_form==="register"?"true":""
    return (
      <div>
        {
          form === 'form'? (
            <div className="login-wrap">
              <div className="login-html">

                <input id="tab-1" type="radio" name="tab" onClick={()=>this.handleChangeForm("login")} className="sign-in" checked ={change_form_signin} />
                <label htmlFor="tab-1" className="tab">Log In</label>
                <input id="tab-2" type="radio" name="tab" onClick={()=>this.handleChangeForm("register")} className="sign-up" checked ={change_form_register}  />
                <label htmlFor="tab-2" className="tab">Register</label>
                <div className="login-form">
                  <Login
                    error_message={this.state.error_message}
                    handleUsernameChange={this.handleLoginEmailChange}
                    handlePasswordChange={this.handleLoginPasswordChange}
                    handleSubmitButton={this.handleLoginSubmitButton}
                  />

                  <Register
                    error_message={this.state.register_error_message}
                    handleRegisterEmailChange={this.handleRegisterEmailChange}
                    handleRegisterPasswordChange={this.handleRegisterPasswordChange}
                    handleRegisterSubmitButton={this.handleRegisterSubmitButton}
                    handleConfirmPassword = {this.handleConfirmPassword}
                    />
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
