import React, {useState, useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import alertContext from '../context/alert/alertContext'



export const Login = () => {
  const context = useContext(alertContext);
    const { showAlert } = context;

    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    let navigate = useNavigate()
    const url = "/login"
    // const url = "http://localhost:5000/api/auth/login"

    const onChange = (e) => {
         setUser({
            ...user, [e.target.name]: e.target.value
         })
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        const response = await fetch(url, {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: user.email,password: user.password}) 
          });
          const json = await response.json()
          console.log(json);

          if (json.success) {
            localStorage.setItem('token',json.authToken)
            navigate('/');
            showAlert("You are successfully logged in!", "success")
          } else {
            showAlert(json.error, "danger")
            // alert(json.error)
          }
    }
  return (
    
        <div className="container login-container">
	<div className="screen">
		<div className="screen__content">
			<form className="login"  onSubmit={handleSubmit}>
				<div className="login__field">
					<i className="login__icon fas fa-user"></i>
					<input type="text" className="login__input" id='email' name='email' value={user.email} onChange={onChange} placeholder="User name / Email" />
				</div>
				<div className="login__field">
					<i className="login__icon fas fa-lock"></i>
					<input type="password" className="login__input" id='password' name='password' value={user.password} onChange={onChange} placeholder="Password" />
				</div>
				<button className="button login__submit">
					<span className="button__text">Log In Now</span>
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
    
  )
}
