import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PageStyles/Login.css';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();
    const [uname, setUname] = useState('');
    const [password, setPassword] = useState('');
    const[errors,setErrors] = useState({});

    const validateForm = () =>{
       const errors ={};
       if(!uname.trim())
       {
        errors.name="UserName is Required"
       }
       if(!password.trim())
       {
        errors.password = "password is Required"
       }
       setErrors(errors);
       return Object.keys(errors).length === 0;
    }
    
    
    const handleLogin = async () => {

        if(!validateForm())
        {
            return
        }
        
        const response  = await axios.post('http://localhost:3001/admin/login', {uname, password});
        if(response.data.success){
            alert('Login Successfull')
            navigate('/dashboard')
        }
        else{
            alert('invalid data')
        }
    }
    
    return (
        <div className="login-con">
            <h1>Anjana Infotech</h1>
            
            <form className='login-form'>
                <input
                    type="text"
                    placeholder="Username"
                    value={uname}
                    onChange={(e) => setUname(e.target.value)}
                    required
                />
                {errors.name && <span>{errors.name}</span>}
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    className='password'
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {errors.password && <span>{errors.password}</span>}
                <button type="button" onClick={() => { handleLogin(); }}>Login</button>
            </form>
        </div>
    );
};

export default Login;
