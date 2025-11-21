import React, { useState } from 'react'
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

import Picker from "emoji-picker-react"

import styled from "styled-components";

export default function ChatInput({ sendMessage, currentChat }) {
  const [msg, setMsg] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
    
    const [showPicker, setShowPicker] = useState(false);

  const sendChat = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('chat-app-user'));
    if (!user || !currentChat) {
      return;
    }
    if (image) {
      sendMessage({ imageFile: image });
      setImage(null);
      setPreview(null);
    } else if (msg.length > 0) {
      sendMessage(msg);
      setMsg("");
    }
  };

    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file && file.size < 5 * 1024 * 1024 && ["image/jpeg", "image/png"].includes(file.type)) {
        setImage(file);
        setPreview(URL.createObjectURL(file));
      }
    };

    return (
      <>
      {
        showPicker && (
          <EmojiContainer className="emoji-menu" >
            <Picker onEmojiClick={(emojiObject)=> setMsg((prevMsg)=> prevMsg + emojiObject.emoji)}/>
          </EmojiContainer>
        )
      }
        <Container>
            <form onSubmit={sendChat} className="input-container">
                <div className='emoji'>
                    <MdOutlineEmojiEmotions onClick={()=>{setShowPicker(!showPicker)}}/>
                </div>
                <div className="attachment">
                  <label htmlFor="file-upload">+</label>
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/jpeg,image/png"
                    onChange={handleImageChange}
                  />
                </div>
                <input
                  type="text"
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  placeholder='Message'
                />
                {preview && (
                  <div className="preview-container">
                    <img src={preview} alt="preview" className="image-preview" />
                    <span className="remove-preview" onClick={() => { setImage(null); setPreview(null); }}>×</span>
                  </div>
                )}
                <button type='submit'>
                    <IoMdSend/>
                </button>
            </form>
            <div>
              {msg.imageUrl ? (
                <img src={msg.imageUrl} alt="chat-img" className="message-image" />
              ) : (
                <span className="message-text">{msg.message}</span>
              )}
            </div>
        </Container>
      </>
    )
}
const EmojiContainer = styled.div`
  position: absolute;
  margin-top: 7.1rem;
  margin-left: 30px;
  z-index: 10;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  overflow: hidden;
`
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #1a1d24;
  padding: 1rem 2rem;
  border-top: 1px solid #2c3038;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0.8rem 2rem;
    gap: 1rem;
  }
  
  .input-container {
    width: 100%;
    border-radius: 1.8rem;
    display: flex;
    align-items: center;
    gap: 0.8rem;
    background-color: #2c303a;
    padding: 0.6rem 1.2rem;
    transition: all 0.3s ease;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    border: 1px solid #3a3f4b;

    &:focus-within {
      box-shadow: 0 2px 8px rgba(97, 118, 255, 0.2);
      border-color: #4d5bce;
    }

    .attachment {
      position: relative;
      display: flex;
      align-items: center;
      input[type="file"] {
        display: none;
      }
      label {
        color: #a0a8c0;
        font-size: 2rem; /* increased from 1.8rem to better match larger emoji */
        cursor: pointer;
        transition: all 0.3s ease;
        padding: 0.5rem; /* slightly increased padding */
        display: flex;
        align-items: center;
        border-radius: 50%;
        margin-left: 0.25rem; /* small gap from emoji */
        
        &:hover {
          color: #61dafb;
          background-color: rgba(97, 218, 251, 0.1);
          transform: scale(1.06);
        }
      }
    }

    .emoji {
      position: relative;
      display: flex;
      align-items: center;
      margin-right: 0.15rem; /* tighten spacing to keep emoji near + */
      svg {
        color: #a0a8c0;
        font-size: 2.2rem; /* increased from 1.6rem */
        cursor: pointer;
        transition: all 0.25s ease;
        padding: 0.45rem; /* slightly larger clickable area */
        border-radius: 50%;
        background-color: transparent; /* keep transparent by default */
        
        &:hover {
          color: #ff7eb6;
          background-color: rgba(255, 126, 182, 0.08); /* subtle hover circle */
          transform: scale(1.08);
        }
      }
    }
    
    input[type="text"] {
      width: 100%;
      height: 45px;
      background-color: #2c303a;
      color: #e0e6fd;
      border: none;
      border-radius: 1rem;
      font-size: 1.1rem;
      padding: 0 1rem;
      transition: all 0.3s ease;
      
      &::placeholder {
        color: #7a819a;
        font-size: 1rem;
      }
      
      &::selection {
        background-color: #4d5bce;
      }
      
      &:focus {
        outline: none;
      }
    }
    
    button {
      border-radius: 50%;
      width: 3rem;
      height: 3rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #4d5bce;
      border: none;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
      
      &:hover {
        background-color: #6170ff;
        transform: scale(1.05);
        box-shadow: 0 4px 8px rgba(97, 112, 255, 0.4);
      }
      
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        svg {
          font-size: 1.5rem;
        }
      }
      
      svg {
        font-size: 1.5rem;
        color: white;
      }
    }
    
    .preview-container {
      position: relative;
      margin: 0 0.5rem;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
      
      .image-preview {
        max-width: 100px;
        max-height: 80px;
        object-fit: cover;
        border-radius: 8px;
      }
      
      .remove-preview {
        position: absolute;
        top: -2px;
        right: -2px;
        background-color: rgba(0, 0, 0, 0.6);
        color: white;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        font-size: 16px;
        font-weight: bold;
        
        &:hover {
          background-color: rgba(255, 0, 0, 0.7);
        }
      }
    }
    
    .message-image {
      max-width: 200px;
      border-radius: 8px;
      margin-top: 0.5rem;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    }
    
    .message-text {
      color: #e0e6fd;
    }
  }
`;
