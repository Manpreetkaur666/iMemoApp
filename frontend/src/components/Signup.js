import React,{useState, useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import alertContext from '../context/alert/alertContext'

export const Signup = () => {
  const context = useContext(alertContext);
    const { showAlert } = context;
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: ""
})
let navigate = useNavigate()
const url = "/createuser"

const onChange = (e) => {
     setUser({
        ...user, [e.target.name]: e.target.value
     })
}
const handleSubmit = async(e) => {
    e.preventDefault();
    if (user.password === user.confirmpassword) {
      
      const response = await fetch(url, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name: user.name,email: user.email,password: user.password}) 
      });
      const json = await response.json()
      console.log(json);

      if (json.success) {
        console.log(json.success, json.authToken)
        localStorage.setItem('token',json.authToken)
        navigate('/');
        showAlert("You are successfully Signed Up!", "success")
      } else {
        showAlert(json.error, "danger")
        navigate('/signup')
      }

    } else {
      alert("Please Confirm your password Again!")
    }
    
}
  return (
    <div>
    <div className="container login-container">
<div className="screen">
<div className="screen__content">
  <form className="login"  onSubmit={handleSubmit}>
  <div className="login__field">
      <i className="login__icon fas fa-user"></i>
      <input type="text" className="login__input" id='name' name='name' value={user.name} onChange={onChange} placeholder="Full Name" />
    </div>
    <div className="login__field">
      <i className="login__icon fas fa-user"></i>
      <input type="text" className="login__input" id='email' name='email' value={user.email} onChange={onChange} placeholder="User name / Email" />
    </div>
    <div className="login__field">
      <i className="login__icon fas fa-lock"></i>
      <input type="password" className="login__input" id='password' name='password' minLength={5} value={user.password} onChange={onChange} placeholder="Password" />
    </div>
    <div className="login__field">
      <i className="login__icon fas fa-lock"></i>
      <input type="password" className="login__input" id='confirmpassword' name='confirmpassword' minLength={5} value={user.confirmpassword} onChange={onChange} placeholder="Confirm Password" />
    </div>
    <button className="button login__submit">
      <span className="button__text">Sign Up Now</span>
      <i className="button__icon fas fa-chevron-right"></i>
    </button>				
  </form>
</div>
<div className="screen__background">
  <span className="screen__background__shape screen__background__shape4"></span>
  <span className="screen__background__shape screen__background__shape3"></span>		
  <span className="screen__background__shape screen__background__shape2"></span>
  <span className="screen__background__shape screen__background__shape1"></span>
</div>		
</div>
</div>
</div>
  )
}
