// import React  from 'react'


// function Register(props) {

//     return (
//             <div className="sign-up-htm">
//             <div className="group">
//             <br/><label htmlFor="user" className="label">Username</label>
//                 <input id="user" type="text" className="input" onChange={props.handleRegisterEmailChange}/>
//             </div>

//             <div className="group">
//             <label htmlFor="pass" className="label">Password</label>
//                 <input id="pass" type="password" className="input" data-type="password" onChange={props.handleRegisterPasswordChange}/>
//             </div>
//             <div className="group">
//              <label htmlFor="pass" className="label">Confirm Password</label>
//                 <input id="pass" type="password" className="input" data-type="password" onChange={props.handleConfirmPassword}/>
//             </div>
//             <div className="group">
//             <br/><input type="submit" className="button" value="Register" onClick={props.handleRegisterSubmitButton}/>
//             <span style = {{color:"red",fontSize:"12px"}}>{props.error_message}</span>
//             </div>
//             <div className="hr"></div>
//         </div>
//     )
// }

// export default Register

import React, { Component } from 'react'
import validator from 'validator'
import RegisterPage from './RegisterPage'
import axios from 'axios'
export class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            registerEmail: "",
            registerPassword: "",
            register_error_message: "",
            confirmPassword: "",
        }
    }

    handleEmailChange = (event) => {
        const { value } = event.target
        this.setState({ ...this.state, registerEmail: value });
    }

    handlePasswordChange = (event) => {
        const { value } = event.target
        this.setState({ ...this.state, registerPassword: value });
    }

    handleConfirmPassword = (event) => {
        const { value } = event.target
        this.setState({ ...this.state, confirmPassword: value });
    }

    handleSubmitButton = async () => {
        console.log("register");
        const { registerEmail, registerPassword, confirmPassword } = this.state
        const username_password = {
            registerEmail,
            registerPassword
        }
        if (registerEmail !== "" && registerPassword !== "" && registerPassword === confirmPassword) {
            console.log("I am here");
            if (validator.isEmail(registerEmail)) {
                console.log("Valid Email");
                try {
                    const event = await axios.post('/register', username_password)
                    console.log(event)
                    if (event.data.Type === "Success") {
                        localStorage.setItem("state", "dashboard");
                        localStorage.setItem("name", registerEmail);
                        localStorage.setItem("userId", event.data.Payload.generated_keys[0]);
                        this.props.form("dashboard")
                        this.props.user(registerEmail)
                        this.setState({ ...this.state, userId: event.data.Payload.id, form: "dashboard", user: registerEmail, register_error_message: '' })
                    } else {
                        console.log('error', event.data.Message)
                        this.setState({ ...this.state, register_error_message: "Registration Error!" })
                    }
                } catch (error) {
                    console.log('error', error)
                    this.setState({ ...this.state, register_error_message: "Registration Error!" })
                }
            } else {
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
    render() {
        return (
            <div>
                <RegisterPage
                    handleEmailChange={this.handleEmailChange}
                    handlePasswordChange={this.handlePasswordChange}
                    handleConfirmPassword = {this.handleConfirmPassword}
                    handleSubmitButton={this.handleSubmitButton}
                    error_message={this.state.error_message}
                />
            </div>
        )
    }
}

export default Register

