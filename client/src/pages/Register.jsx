import React,{useState} from 'react'
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';
import {ToastContainer, toast} from "react-toastify";

import styled from "styled-components"
import { registerRoute } from '../utils/APIroute';

function Register() {
    const navigate = useNavigate();

    const [values, setValues] = useState({
        username : "",
        email : "",
        password : "",
        confirmPassword : "",
    })

    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    const handleValidation = () => {
        const { password, confirmPassword, username, email } = values;
        if (password !== confirmPassword) {
          toast.error(
            "Password and confirm password should be same.",
            toastOptions
          );
          return false;
        } else if (username.length < 3) {
          toast.error(
            "Username should be greater than 3 characters.",
            toastOptions
          );
          return false;
        } else if (password.length < 8) {
          toast.error(
            "Password should be equal or greater than 8 characters.",
            toastOptions
          );
          return false;
        } else if (email === "") {
          toast.error("Email is required.", toastOptions);
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
          const {password, confirmPassword, username, email} = values;
          const {data} = await axios.post(registerRoute,{
            username,
            email,
            password
          });
          if (data.status === false) {
            toast.error(data.msg, toastOptions);
          }
          if (data.status === true) {
            localStorage.setItem("chat-app-user",JSON.stringify(data.user));
            navigate("/setProfile");
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
                            placeholder="Choose a unique username"
                            name="username"
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    
                    <div className="input-group">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            name="email"
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    
                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Create a secure password"
                            name="password"
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    
                    <div className="input-group">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            placeholder="Confirm your password"
                            name="confirmPassword"
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    
                    <button type="submit">
                        <span className="button-text">Create Account</span>
                    </button>
                    
                    <span className="login-link">
                        Already have an account? <Link to="/login">Login</Link>
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
  background: linear-gradient(135deg, #1e1b4b 0%, #312e81 35%, #1e3a8a 100%);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M20 20c0 4.4-3.6 8-8 8s-8-3.6-8-8 3.6-8 8-8 8 3.6 8 8zm0 0c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8-8-3.6-8-8z'/%3E%3C/g%3E%3C/svg%3E");
    animation: backgroundMove 25s linear infinite;
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
      radial-gradient(circle at 25% 25%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 75% 75%, rgba(14, 165, 233, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.08) 0%, transparent 50%);
    z-index: 0;
  }
  
  @keyframes backgroundMove {
    0% { transform: translateX(0) translateY(0); }
    25% { transform: translateX(15px) translateY(-15px); }
    50% { transform: translateX(-10px) translateY(15px); }
    75% { transform: translateX(-15px) translateY(-5px); }
    100% { transform: translateX(0) translateY(0); }
  }
  
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    position: relative;
    margin-bottom: 1.5rem;
    z-index: 1;
    
    h1 {
      font-size: 2.8rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 2.5px;
      background: linear-gradient(135deg, #8b5cf6, #0ea5e9, #10b981);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      position: relative;
      text-shadow: 0 4px 20px rgba(139, 92, 246, 0.3);
      
      &::after {
        content: '';
        position: absolute;
        bottom: -10px;
        left: 50%;
        transform: translateX(-50%);
        width: 50px;
        height: 3px;
        background: linear-gradient(90deg, #8b5cf6, #0ea5e9, #10b981);
        border-radius: 2px;
        box-shadow: 0 2px 10px rgba(139, 92, 246, 0.5);
      }
      
      &::before {
        content: '🚀';
        position: absolute;
        left: -55px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 2.2rem;
        animation: rocket 3s infinite;
      }
    }
  }
  
  @keyframes rocket {
    0%, 100% { transform: translateY(-50%) rotate(0deg); }
    25% { transform: translateY(-60%) rotate(-5deg); }
    50% { transform: translateY(-45%) rotate(5deg); }
    75% { transform: translateY(-55%) rotate(-3deg); }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    background: rgba(30, 27, 75, 0.95);
    padding: 2.8rem 3.2rem;
    border-radius: 24px;
    box-shadow: 
      0 25px 50px rgba(0, 0, 0, 0.5),
      0 0 0 1px rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(20px);
    position: relative;
    z-index: 1;
    max-width: 440px;
    width: 100%;
    transition: all 0.3s ease;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, #8b5cf6, #0ea5e9, #10b981);
      border-radius: 24px 24px 0 0;
    }
    
    &::after {
      content: '';
      position: absolute;
      top: -2px;
      left: -2px;
      right: -2px;
      bottom: -2px;
      background: linear-gradient(135deg, #8b5cf6, #0ea5e9, #10b981);
      border-radius: 26px;
      z-index: -1;
      opacity: 0.6;
      filter: blur(8px);
    }
    
    &:hover {
      transform: translateY(-3px);
      box-shadow: 
        0 30px 60px rgba(0, 0, 0, 0.6),
        0 0 0 1px rgba(255, 255, 255, 0.12);
    }
  }
  
  .input-group {
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
    width: 100%;
    position: relative;
    
    label {
      color: #e2e8f0;
      font-size: 0.9rem;
      font-weight: 600;
      margin-left: 4px;
      letter-spacing: 0.5px;
      background: linear-gradient(135deg, #8b5cf6, #0ea5e9);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  }
  
  input {
    background: rgba(49, 46, 129, 0.7);
    padding: 1.1rem 1.4rem;
    border: 2px solid rgba(99, 102, 241, 0.2);
    border-radius: 14px;
    color: #f8fafc;
    width: 100%;
    font-size: 1rem;
    transition: all 0.3s ease;
    box-shadow: 
      0 4px 6px rgba(0, 0, 0, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
    
    &::placeholder {
      color: #a5b4fc;
      font-style: italic;
    }
    
    &:focus {
      border: 2px solid #8b5cf6;
      outline: none;
      box-shadow: 
        0 0 0 4px rgba(139, 92, 246, 0.25),
        0 4px 12px rgba(139, 92, 246, 0.4);
      transform: translateY(-1px);
      background: rgba(49, 46, 129, 0.9);
    }
    
    &:hover {
      border-color: rgba(99, 102, 241, 0.4);
      background: rgba(49, 46, 129, 0.8);
    }
  }
  
  button {
    background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 50%, #0ea5e9 100%);
    color: white;
    padding: 1.3rem 2rem;
    border: none;
    font-weight: 700;
    cursor: pointer;
    border-radius: 14px;
    font-size: 1.05rem;
    text-transform: uppercase;
    letter-spacing: 1.2px;
    transition: all 0.3s ease;
    box-shadow: 
      0 10px 30px rgba(139, 92, 246, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
    position: relative;
    overflow: hidden;
    margin-top: 0.8rem;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.25), transparent);
      transition: all 0.6s ease;
    }
    
    &::after {
      content: '';
      position: absolute;
      right: 15px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 1.2rem;
      opacity: 0.8;
    }
    
    &:hover {
      transform: translateY(-4px);
      box-shadow: 
        0 15px 40px rgba(139, 92, 246, 0.5),
        inset 0 1px 0 rgba(255, 255, 255, 0.3);
      background: linear-gradient(135deg, #7c3aed 0%, #5b21b6 50%, #0284c7 100%);
      
      &::before {
        left: 100%;
      }
    }
    
    &:active {
      transform: translateY(-1px);
      box-shadow: 0 8px 25px rgba(139, 92, 246, 0.4);
    }
  }
  
  span {
    color: #cbd5e1;
    text-align: center;
    font-size: 0.9rem;
    margin-top: 1rem;
    
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
        background: linear-gradient(90deg, #8b5cf6, #0ea5e9);
        transition: width 0.3s ease;
      }
      
      &:hover {
        color: #8b5cf6;
        
        &::after {
          width: 100%;
        }
      }
    }
  }
  
  @media (max-width: 480px) {
    padding: 1rem;
    
    form {
      padding: 2.5rem 2rem;
      margin: 1rem;
    }
    
    .brand h1 {
      font-size: 2.3rem;
      
      &::before {
        left: -45px;
        font-size: 1.8rem;
      }
    }
    
    input {
      padding: 1rem 1.2rem;
    }
  }
`
export default Register