import React ,{useState} from 'react'
import axios from 'axios'


function Register(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleUsernameChange = (event)=>{
      setUsername(event.target.value);
    }

    
    const handlePasswordChange = (event)=>{
      setPassword(event.target.value);
    }

    const handleConfirmPassword = (event)=>{
        setConfirmPassword(event.target.value);
    }

  //   const handleLogInButton = () => {
  //     props.changeForm("login")
  // }

    const handleSubmitButton = async() =>{
        const username_password = {
            username,
            password
        }
        if(username!==""&&password!==""&&password===confirmPassword){
              
              try {
                let event = await axios.post('/register',username_password)
                console.log(event.data.Type)
                      if(event.data.Type==="Success"){
                        localStorage.setItem("state","dashboard");
                        localStorage.setItem("name",username);
                        localStorage.setItem("userId",event.data.Payload.id);
                         props.changeForm("dashboard");
                        props.changeUser(username);
                        props.changeUserID(event.data.Payload.id)
                      }else{
                        console.log('error',event.data.Message)
                        setError(" Registration Error!")
                      }
              } catch (error) {
                console.log('error',error)
                    setError("Registration Error!")
              }  
        }
        else{
          if(username===""&&password===""){
            setError("Input Fields are Required")
          }
          if(password!==confirmPassword){
            setError("Please verify your password!")
          }
         }
    }

    return (
            <div className="sign-up-htm">
            <div className="group">
            <br/><label htmlFor="user" className="label">Username</label>
                <input id="user" type="text" className="input" onChange={handleUsernameChange}/>
            </div>
        
            <div className="group">
            <label htmlFor="pass" className="label">Password</label>
                <input id="pass" type="password" className="input" data-type="password" onChange={handlePasswordChange}/>
            </div>
            <div className="group">
             <label htmlFor="pass" className="label">Confirm Password</label>
                <input id="pass" type="password" className="input" data-type="password" onChange={handleConfirmPassword}/>
            </div>
            <div className="group">
            <br/><input type="submit" className="button" value="Register" onClick={handleSubmitButton}/>
            <span style = {{color:"red",fontSize:"12px"}}>{error}</span>
            </div>
            <div className="hr"></div>
        </div>
    )
}

export default Register
