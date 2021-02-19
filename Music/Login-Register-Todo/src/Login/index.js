// import { useState } from 'react'
// import axios from 'axios'
// import React from 'react';
// import LoginPage from './LoginPage'

// function App(props) {
// return (


//   <div className="sign-in-htm">
//   <div className="group">

//       <br/><br/><label htmlFor="user" className="label">Username</label>
//       <input id="user" type="text" className="input" onChange={props.handleEmailChange}/>
//   </div>
//   <div className="group">
//       <label htmlFor="pass" className="label">Password</label>
//       <input id="pass" type="password" className="input" data-type="password" onChange={props.handlePasswordChange} />
//   </div>

//   <div className="group">
//       <br/><input type="submit" className="button" value="Log In" onClick={props.handleSubmitButton}/>
//       <span style = {{color:"red",fontSize:"12px"}}>{props.error_message}</span>
//   </div>
//   <div className="hr"></div>
// </div>
// );
// }

// export default App;

import React, { Component } from 'react'
import axios from 'axios'
import LoginPage from './LoginPage'

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login_email: "",
            login_password: "",
            error_message: "",
        }
    }

    handleEmailChange = (event) => {
        const { value } = event.target
        this.setState({ login_email: value });
    }

    handlePasswordChange = (event) => {
        const { value } = event.target
        this.setState({ login_password: value });
    }

    handleSubmitButton = async () => {
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
                    this.props.form("dashboard")
                    this.props.user(login_email)
                    this.setState({ ...this.state, userId: event.data.Payload.id, error_message: '' })
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
    render() {
        return (
            <div>
                <LoginPage
                    handleEmailChange={this.handleEmailChange}
                    handlePasswordChange={this.handlePasswordChange}
                    handleSubmitButton={this.handleSubmitButton}
                    error_message = {this.state.error_message}
                />
            </div>
        )
    }
}

export default Login
