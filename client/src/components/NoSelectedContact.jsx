import React, { useState, useEffect } from "react";
import Lottie from "lottie-react";
import conversation from "../assets/animation_lnhbqvxp.json";
import styled from "styled-components";

function NoSelectedContact() {
    const [user, setUser] = useState("");
    const getUser = ()=>{
        const existing = localStorage.getItem('chat-app-user');

        if(existing){
            setUser(existing);
           console.log("User found:", existing);
        }
    }

    useEffect(()=>{
        getUser();
    },
    [])

    return (
        <Container>
            <Lottie animationData={conversation} loop={true}/>
                <h1>
                    Welcome, !
                </h1>
            <h3>Please select a chat to Start messaging.</h3>
        </Container>
    )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #e0e6fd;
  flex-direction: column;
  background-color: #000000;
  height: 100%;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, #7c5cff, #64b5f6, #43e97b);
    opacity: 0.6;
  }
  
  h1 {
    margin-top: 1rem;
    font-size: 2.2rem;
    font-weight: 600;
    color: #ffffff;
    text-shadow: 0 2px 10px rgba(77, 91, 206, 0.2);
    letter-spacing: 0.5px;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 50%;
      transform: translateX(-50%);
      width: 50%;
      height: 2px;
      background: linear-gradient(90deg, transparent, rgba(124, 92, 255, 0.5), transparent);
    }
  }
  
  h3 {
    margin-top: 1.5rem;
    font-size: 1.2rem;
    color: #ffffff;
    font-weight: 400;
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
    padding: 0.5rem 1.5rem;
    border-radius: 2rem;
    border: 1px solid rgba(124, 92, 255, 0.15);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
  }
  
  img {
    height: 20rem;
    filter: drop-shadow(0 5px 15px rgba(124, 92, 255, 0.3));
  }
  
  span {
    color: #64b5f6;
    font-weight: 600;
  }
`;

export default NoSelectedContact