// import { useState } from 'react'
// import axios from 'axios'
import React from 'react';

function LoginPage(props) {
return (
  

  <div className="sign-in-htm">
  <div className="group">
      
      <br/><br/><label htmlFor="user" className="label">Username</label>
      <input id="user" type="text" className="input" onChange={props.handleEmailChange}/>
  </div>
  <div className="group">
      <label htmlFor="pass" className="label">Password</label>
      <input id="pass" type="password" className="input" data-type="password" onChange={props.handlePasswordChange} />
  </div>
 
  <div className="group">
      <br/><input type="submit" className="button" value="Log In" onClick={props.handleSubmitButton}/>
      <span style = {{color:"red",fontSize:"12px"}}>{props.error_message}</span>
  </div>
  <div className="hr"></div>
</div>
);
}

export default LoginPage;

