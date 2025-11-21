import React, { useState, useEffect, useRef} from "react";
import axios from "axios";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import { getMessageRoute, sendMessageRoute, sendImageMessageRoute } from "../utils/APIroute";
import { v4 as uuidv4 } from "uuid";
import {IoPersonCircle} from "react-icons/io5";

import "react-toastify/dist/ReactToastify.css";


export default function ChatContainer(props) {
    const scrollRef = useRef();
    const [messages, setMessages] = useState([]);
    const [incoming, setIncoming] = useState(null);
    const [modalImage, setModalImage] = useState(null);

    const getAllMessages = async()=>{
        const user = await JSON.parse(localStorage.getItem('chat-app-user'));
       
        const res = await axios.post(getMessageRoute,{
            from : user._id,
            to : props.currentChat._id
        })
  // ...existing code...
        setMessages(res.data);
    }
    
    useEffect(()=>{
        if(props.currentChat){
            getAllMessages();
        }
    },
    [props.currentChat])




  const handleSend = async(msg) => {
    const user = await JSON.parse(localStorage.getItem('chat-app-user'));
    if (msg.imageFile) {
      const formData = new FormData();
      formData.append("image", msg.imageFile);
      formData.append("from", user._id);
      formData.append("to", props.currentChat._id);
      try {
        const response = await axios.post(sendImageMessageRoute, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        const data = response.data;
        if (data.imageUrl) {
          // Add Socket.IO emit for real-time image delivery
          props.socket.current.emit("send-msg", {
            to: props.currentChat._id,
            from: user._id,
            message: data.imageUrl,
            type: "image"
          });
          props.socket.current.emit("send-notification", {
            to: props.currentChat._id,
            from: user._id,
            message: "📷 Image",
            type: "image"
          });
          const updatedMessages = [...messages];
          updatedMessages.push({ fromSelf: true, imageUrl: data.imageUrl });
          setMessages(updatedMessages);
        } else {
          console.error("Error sending image message:", data);  
        }
      } catch (err) {
        console.error("Error sending image message:", err);
      }
    } else {
      // Text message
      await axios.post(sendMessageRoute, {
        from: user._id,
        to: props.currentChat._id,
        message: msg
      });
      props.socket.current.emit("send-msg", {
        to: props.currentChat._id,
        from: user._id,
        message: msg,
        type: "text"
      });
      props.socket.current.emit("send-notification", {
        to: props.currentChat._id,
        from: user._id,
        message: msg,
        type: "text"
      });
      const updatedMessages = [...messages];
      updatedMessages.push({ fromSelf: true, message: msg });
      setMessages(updatedMessages);
    }
  };

    useEffect(()=>{
        if(props.socket.current){
            props.socket.current.on("msg-recieve", (msg)=>{
                if (msg.type === "image") {
                    setIncoming({fromSelf: false, imageUrl: msg.message});
                } else {
                    setIncoming({fromSelf: false, message: msg.message});
                }
            });
        }
    },
    []);

    useEffect(()=>{
        incoming && (setMessages((prev) => [...prev, incoming]));
    },[incoming]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);



    return (
      <>        
        <Container>
            <div className="chat-header">
                <div className="user-details">
                <div className="avatar">
                  {
                     props.currentChat.avatarImage ? 
                    (<img src={props.currentChat.avatarImage} alt=""/>) : 
                    (<IoPersonCircle/>)
                  }
                </div>
                <div className="username">
                    <h3>{props.currentChat.username}</h3>
                </div>
                </div>
            </div>
            <div className="chat-messages">
                {
                    messages.map((message)=>{
                        return(
                            <div ref={scrollRef} key={uuidv4()}>
                                <div className={`message ${message.fromSelf ? "sended" : "recieved"}`}>
                                    {message.imageUrl ? (
                                      <img 
                                        src={message.imageUrl} 
                                        alt="chat-img" 
                                        style={{ maxWidth: 200, cursor: 'pointer' }} 
                                        onClick={() => setModalImage(message.imageUrl)}
                                      />
                                    ) : (
                                      <span>{message.message}</span>
                                    )}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <ChatInput sendMessage={handleSend} currentChat={props.currentChat} />
        </Container>
        {modalImage && (
          <ImageModal onClick={() => setModalImage(null)}>
            <img src={modalImage} alt="full-size" style={{ maxHeight: '90vh', maxWidth: '90vw' }} />
          </ImageModal>
        )}
      </>
    )
}

const ImageModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  cursor: pointer;

  img {
    object-fit: contain;
    max-height: 90vh;
    max-width: 90vw;
  }
`;

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  gap: 0.1rem;
  overflow: hidden;
  background: #1a1a1a;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 10% 75% 15%;
  }
  
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background-color: #2d2d2d;
    border-bottom: 1px solid #333;
    .user-details {
      display: flex;
      align-items: center;
      height : 0.5rem;
      .avatar {
        img {
          height: 3rem;
          width : 3rem;
          border-radius : 50%;
          border: 2px solid #000000;
        }
        svg {
          color : #A0A0A0;
          font-size: 3rem;
          cursor: pointer;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    color: #fff;
    background-color: #1a1a1a;
    &::-webkit-scrollbar {
      margin-top: 10px;
      margin-bottom: 10px;
      width: 0.4rem;
     
      &-thumb {
        background-color: grey;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: inline-block;
      align-items: center;
      height : 100%;
      border-bottom-left-radius : 0.5rem;
      border-bottom-right-radius : 0.5rem;
      padding : 0.5rem;
      .content {
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      float: right;
      justify-content: flex-end;
      background-color: #2962ff;
      padding: 0.8rem 1rem;
      max-width: 60%;
      border-radius: 1rem 1rem 0 1rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }
    .recieved {
      padding: 0.8rem 1rem;
      justify-content: flex-start;
      max-width: 60%;
      background-color: #424242;
      border-radius: 1rem 1rem 1rem 0;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }
  }
`;
