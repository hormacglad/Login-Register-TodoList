import React  from 'react'


function RegisterPage(props) {
    

    return (
            <div className="sign-up-htm">
            <div className="group">
            <br/><label htmlFor="user" className="label">Username</label>
                <input id="user" type="text" className="input" onChange={props.handleEmailChange}/>
            </div>
        
            <div className="group">
            <label htmlFor="pass" className="label">Password</label>
                <input id="pass" type="password" className="input" data-type="password" onChange={props.handlePasswordChange}/>
            </div>
            <div className="group">
             <label htmlFor="pass" className="label">Confirm Password</label>
                <input id="pass" type="password" className="input" data-type="password" onChange={props.handleConfirmPassword}/>
            </div>
            <div className="group">
            <br/><input type="submit" className="button" value="Register" onClick={props.handleSubmitButton}/>
            <span style = {{color:"red",fontSize:"12px"}}>{props.error_message}</span>
            </div>
            <div className="hr"></div>
        </div>
    )
}

export default RegisterPage