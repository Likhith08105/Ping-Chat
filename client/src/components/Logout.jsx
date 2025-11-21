import React from "react";
import { useNavigate } from "react-router-dom";
import {GoSignOut} from "react-icons/go"
import { logoutRoute } from "../utils/APIroute";
import styled from "styled-components";
import axios from "axios";

export default function Logout() {
    const navigate = useNavigate();

    const handleClick = async () => {
        const user = await JSON.parse(localStorage.getItem('chat-app-user'));
        const id = user._id;

        const data = await axios.get(`${logoutRoute}/${id}`);
        
        if (data.status === 200) {
            localStorage.clear();
            navigate("/login");
        }
    };
    
    return (
        <Button onClick={handleClick}>
            <GoSignOut/>
        </Button>
    );
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.6rem;
  border-radius: 50%;
  border: none;
  position: relative;
  background-color: #2c303a;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  overflow: hidden;
  z-index: 1;
  
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, #7c5cff, #64b5f6, #43e97b);
    border-radius: 50%;
    z-index: -1;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &::after {
    content: '';
    position: absolute;
    inset: 2px;
    background: #2c303a;
    border-radius: 50%;
    z-index: -1;
    transition: all 0.3s ease;
  }
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(124, 92, 255, 0.4);
    
    &::before {
      opacity: 1;
    }
    
    &::after {
      background: linear-gradient(120deg, #353b4e 0%, #2c303a 100%);
    }
  }
  
  svg {
    font-size: 1.3rem;
    color: #a0a8c0;
    transition: all 0.3s ease;
    filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.2));
    z-index: 2;
  }
  
  &:hover svg {
    color: #e0e6fd;
    filter: drop-shadow(0 0 2px rgba(124, 92, 255, 0.5));
    animation: pulse 1.5s infinite;
  }
  
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }
`;