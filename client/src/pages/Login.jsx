import React,{useState,useEffect} from 'react'
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';
import {ToastContainer, toast} from "react-toastify";
import { loginRoute } from '../utils/APIroute';

import "react-toastify/dist/ReactToastify.css";

import styled from "styled-components"

function Login() {
    const navigate = useNavigate();

    const [values, setValues] = useState({
        username : "",
        password : "",
    })

    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    useEffect(()=>{
      if(localStorage.getItem('chat-app-user')){
        navigate("/");
      }
    },[]);
    
    const handleValidation = () => {
      const { username, password } = values;
      if (username === "") {
        toast.error("Email and Password is required.", toastOptions);
        return false;
      } else if (password === "") {
        toast.error("Email and Password is required.", toastOptions);
        return false;
      }
      return true;
    };

    const handleChange = (e)=>{
        setValues({...values, [e.target.name] : e.target.value});
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        if(handleValidation()){
          const {username, password} = values;
          const {data} = await axios.post(loginRoute,{
            username,
            password
          });
          if (data.status === false) {
            toast.error(data.msg, toastOptions);
          }
          else{
            localStorage.setItem("chat-app-user",JSON.stringify(data.user));
            navigate("/");
          }
        }
    }

    return (
        <>
            <FormContainer>
                <form onSubmit={(e)=>handleSubmit(e)}>
                    <div className='brand'>
                        <h1>Ping Chat</h1>
                    </div>
                    
                    <div className="input-group">
                        <label>Username</label>
                        <input
                            type="text"
                            placeholder="Enter your username"
                            name="username"
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    
                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            name="password"
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    
                    <button type="submit">
                        <span className="button-text">Sign In</span>
                    </button>
                    
                    <span className="register-link">
                      Don't have an account? <Link to="/register">Create One</Link>
                    </span>
                </form>
            </FormContainer>
            <ToastContainer/>
        </>
    )
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background: linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 35%, #16213e 100%);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M20 20c0 4.4-3.6 8-8 8s-8-3.6-8-8 3.6-8 8-8 8 3.6 8 8zm0 0c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8-8-3.6-8-8z'/%3E%3C/g%3E%3C/svg%3E");
    animation: backgroundMove 20s linear infinite;
    z-index: 0;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
      radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, rgba(34, 197, 94, 0.05) 0%, transparent 50%);
    z-index: 0;
  }
  
  @keyframes backgroundMove {
    0% { transform: translateX(0) translateY(0); }
    25% { transform: translateX(-10px) translateY(-10px); }
    50% { transform: translateX(-20px) translateY(10px); }
    75% { transform: translateX(10px) translateY(-5px); }
    100% { transform: translateX(0) translateY(0); }
  }
  
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    position: relative;
    margin-bottom: 2rem;
    z-index: 1;
    
    h1 {
      font-size: 3rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 3px;
      background: linear-gradient(135deg, #3b82f6, #a855f7, #22c55e);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      position: relative;
      text-shadow: 0 4px 20px rgba(59, 130, 246, 0.3);
      
      &::after {
        content: '';
        position: absolute;
        bottom: -12px;
        left: 50%;
        transform: translateX(-50%);
        width: 60px;
        height: 4px;
        background: linear-gradient(90deg, #3b82f6, #a855f7, #22c55e);
        border-radius: 2px;
        box-shadow: 0 2px 10px rgba(59, 130, 246, 0.5);
      }
      
      &::before {
        content: '💬';
        position: absolute;
        left: -50px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 2rem;
        animation: bounce 2s infinite;
      }
    }
  }
  
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(-50%); }
    40% { transform: translateY(-60%); }
    60% { transform: translateY(-55%); }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1.8rem;
    background: rgba(15, 23, 42, 0.95);
    padding: 3rem 3.5rem;
    border-radius: 20px;
    box-shadow: 
      0 20px 40px rgba(0, 0, 0, 0.4),
      0 0 0 1px rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(20px);
    position: relative;
    z-index: 1;
    max-width: 420px;
    width: 100%;
    transition: all 0.3s ease;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(90deg, #3b82f6, #a855f7, #22c55e);
      border-radius: 20px 20px 0 0;
    }
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: 
        0 25px 50px rgba(0, 0, 0, 0.5),
        0 0 0 1px rgba(255, 255, 255, 0.1);
    }
  }
  
  .input-group {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    width: 100%;
    position: relative;
    
    label {
      color: #cbd5e1;
      font-size: 0.95rem;
      font-weight: 600;
      margin-left: 4px;
      letter-spacing: 0.5px;
      background: linear-gradient(135deg, #3b82f6, #a855f7);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  }
  
  input {
    background: rgba(30, 41, 59, 0.8);
    padding: 1.2rem 1.5rem;
    border: 2px solid rgba(71, 85, 105, 0.3);
    border-radius: 12px;
    color: #f1f5f9;
    width: 100%;
    font-size: 1rem;
    transition: all 0.3s ease;
    box-shadow: 
      0 4px 6px rgba(0, 0, 0, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.05);
    
    &::placeholder {
      color: #94a3b8;
      font-style: italic;
    }
    
    &:focus {
      border: 2px solid #3b82f6;
      outline: none;
      box-shadow: 
        0 0 0 4px rgba(59, 130, 246, 0.2),
        0 4px 12px rgba(59, 130, 246, 0.3);
      transform: translateY(-1px);
    }
    
    &:hover {
      border-color: rgba(71, 85, 105, 0.5);
    }
  }
  
  button {
    background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #a855f7 100%);
    color: white;
    padding: 1.3rem 2rem;
    border: none;
    font-weight: 700;
    cursor: pointer;
    border-radius: 12px;
    font-size: 1.1rem;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    transition: all 0.3s ease;
    box-shadow: 
      0 8px 25px rgba(59, 130, 246, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
    position: relative;
    overflow: hidden;
    margin-top: 0.5rem;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
      transition: all 0.6s ease;
    }
    
    &:hover {
      transform: translateY(-3px);
      box-shadow: 
        0 12px 35px rgba(59, 130, 246, 0.5),
        inset 0 1px 0 rgba(255, 255, 255, 0.3);
      background: linear-gradient(135deg, #2563eb 0%, #7c3aed 50%, #9333ea 100%);
      
      &::before {
        left: 100%;
      }
    }
    
    &:active {
      transform: translateY(-1px);
      box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
    }
  }
  
  span {
    color: #94a3b8;
    text-align: center;
    font-size: 0.95rem;
    margin-top: 0.5rem;
    
    a {
      color: #60a5fa;
      text-decoration: none;
      font-weight: 600;
      transition: all 0.3s ease;
      position: relative;
      margin-left: 0.3rem;
      
      &::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 0;
        height: 2px;
        background: linear-gradient(90deg, #3b82f6, #a855f7);
        transition: width 0.3s ease;
      }
      
      &:hover {
        color: #3b82f6;
        
        &::after {
          width: 100%;
        }
      }
    }
  }
  
  @media (max-width: 480px) {
    padding: 1rem;
    
    form {
      padding: 2rem 2rem;
      margin: 1rem;
    }
    
    .brand h1 {
      font-size: 2.5rem;
      
      &::before {
        left: -40px;
        font-size: 1.8rem;
      }
    }
  }
`
export default Login