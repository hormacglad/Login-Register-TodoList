import { useState } from 'react'
import axios from 'axios'

function App(props) {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }
 

  const handleSubmitButton = async() => {
    // e.preventDefault();
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
            console.log(event.data.Payload.id,"PPPPPPP");
            localStorage.setItem("state","dashboard");
            localStorage.setItem("name",username);
            // localStorage.setItem("userId",event.data.Payload.id);
            props.changeUserID(event.data.Payload.id)
            props.changeForm("dashboard");
            props.changeUser(username);
           
          } else {
            setError("Credentials Not Found!");
          }
      } catch (error) {
        setError("Credentials Not Found!");
      }
    } else {
        
          setError("Invalid! Empty Input");
       
       
    }
  }

return (
  

  <div className="sign-in-htm">
  <div className="group">
      
      <br/><br/><label htmlFor="user" className="label">Username</label>
      <input id="user" type="text" className="input" onChange={handleUsernameChange}/>
  </div>
  <div className="group">
      <label htmlFor="pass" className="label">Password</label>
      <input id="pass" type="password" className="input" data-type="password" onChange={handlePasswordChange} />
  </div>
 
  <div className="group">
      <br/><input type="submit" className="button" value="Log In" onClick={handleSubmitButton}/>
      <span style = {{color:"red",fontSize:"12px"}}>{error}</span>
  </div>
  <div className="hr"></div>
</div>
);
}

export default App;