import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { signin } from '../../actions';
import Layout from '../../components/Layout'
import Card from '../../components/UI/Card'
import './style.css';

/**
* @author
* @function Login
**/

const Login = (props) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const dispatch= useDispatch();

  const userLogin = (e) => {
    e.preventDefault();
    if(email === ''){
      alert("Email is required");
      return;
    }
    if(password === ''){
      alert("Password is required");
      return;
    }

    dispatch(signin({email, password}));
  }


  return(
    <Layout>
      <div className='loginContainer'>
        <Card>
          <form onSubmit={userLogin}>

            <input 
            name="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            />

            <input 
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            />
            <div>
              <button>Login</button>
            </div>
          </form>
        </Card>
      </div>
    </Layout>
    
   )

 }

export default Login