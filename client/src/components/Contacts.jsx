import React, { useEffect, useState } from 'react'
import {IoPersonCircle} from "react-icons/io5"
import Logout from './Logout';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import styled from "styled-components";

export default function Contacts(props) {
    const {contacts, currentUser, changeChat, socket} = props;
    const [currentUserName, setCurrentUserName] = useState();
    const [currentSelected, setCurrentSelected] = useState();
    const [modalImage, setModalImage] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState(new Set());


    useEffect(()=>{
        if(currentUser){
            setCurrentUserName(currentUser.username);
        }
    },[currentUser])

    // Socket listeners for online/offline status
    useEffect(() => {
        if (socket.current) {
            // Get initial online users list
            socket.current.emit("get-online-users");
            
            // Listen for online users list
            socket.current.on("online-users-list", (users) => {
                setOnlineUsers(new Set(users));
            });

            // Listen for user coming online
            socket.current.on("user-online", (userId) => {
                setOnlineUsers(prev => new Set([...prev, userId]));
            });

            // Listen for user going offline
            socket.current.on("user-offline", (userId) => {
                setOnlineUsers(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(userId);
                    return newSet;
                });
            });
            // When a component unmounts (or re-renders), React cleans up old listeners to prevent duplicates and memory leaks.
            return () => {
                socket.current.off("online-users-list");
                socket.current.off("user-online");
                socket.current.off("user-offline");
            };
        }
    }, [socket]);

    const changeCurrentChat = (index, contact)=>{
        setCurrentSelected(index)
        changeChat(contact)
    }

    return (
        <>
        {modalImage && (
          <ImageModal onClick={() => setModalImage(null)}>
            <img src={modalImage} alt="profile-large" onClick={e => e.stopPropagation()} />
          </ImageModal>
        )}
        {currentUserName && (
          <Container>
            <div className='contact-header'>
            <div className="current-user">
                <div className="avatar">
                    {
                      currentUser.avatarImage ? 
                        (<img src={currentUser.avatarImage} alt="" onClick={() => setModalImage(currentUser.avatarImage)} style={{cursor: 'pointer'}} />) : 
                        (<IoPersonCircle/>)
                    }
                </div>
                <div className="username">
                  <h2>{currentUserName}</h2>
                </div>
                
            </div>
            <div style={{position:"relative"}}>
              <Logout/>
            </div>
            </div>
            <div className="contacts">
              {contacts.map((contact, index) => {
                const isOnline = onlineUsers.has(contact._id);
                return (
                  <div
                    key={contact._id}
                    className={`contact ${
                      index === currentSelected ? "selected" : ""
                    }`}
                    onClick={() => changeCurrentChat(index, contact)}
                  >
                    <div className="avatar">
                        {props.loading && (
                            <Skeleton
                                circle
                                height="100%"
                                containerClassName="avatar-skeleton"
                            />
                        )}
                        {
                          contact.avatarImage ? 
                            (<img src={contact.avatarImage} alt="" onClick={e => {e.stopPropagation(); setModalImage(contact.avatarImage)}} style={{cursor: 'pointer'}} />) : 
                            (<IoPersonCircle/>)
                        }
                        <div className={`online-indicator ${isOnline ? 'online' : 'offline'}`}></div>
                    </div>
                    <div className="username">
                      {props.loading ? <Skeleton width={70} /> : 
                        <div className="user-info">
                          <h3>{contact.username}</h3>
                          <span className={`status ${isOnline ? 'online' : 'offline'}`}>
                            {isOnline ? 'Online' : 'Offline'}
                          </span>
                        </div>
                      }
                    </div>
                  </div>
                );
              })}
            </div>
          </Container>
        )}
      </>
    )
}

const ImageModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  img {
    max-width: 90vw;
    max-height: 90vh;
    border-radius: 12px;
    box-shadow: 0 4px 32px rgba(0,0,0,0.4);
    background: #23272b;
  }
`;

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #23272b; /* main sidebar background: dark gray-black */
  border-right: 1px solid #393c41; /* lighter gray border */
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.15);
  
  .contact-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #35373b; /* header: lighter black */
    padding: 0.8rem 1rem;
    border-bottom: 1px solid #44474d;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
    position: relative;
  }
  
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    padding: 0.5rem 0;
    background-color: #23272b;
    &::-webkit-scrollbar {
      width: 0.3rem;
      &-thumb {
        background: #44474d;
        border-radius: 1rem;
      }
      &-track {
        background-color: #23272b;
      }
    }
    .contact {
      background-color: #35373b; /* contact item: lighter black */
      min-height: 4rem;
      cursor: pointer;
      width: 95%;
      margin: 0.4rem 0;
      padding: 0.5rem 1rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: all 0.3s ease;
      border-radius: 10px;
      border: 1px solid #44474d;
      position: relative;
      overflow: hidden;
      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 4px;
        height: 100%;
        background: #8a8a8a; /* subtle gray highlight */
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      &:hover {
        background-color: #44474d;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.18);
        border: 1px solid #5a5d63;
        &::before {
          opacity: 0.5;
        }
      }
      .avatar {
        position: relative;
        img {
          height: 3rem;
          width: 3rem;
          border-radius: 50%;
          object-fit: cover;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          border: 1.5px solid #4285f4; /* thin blue border */
          position: relative;
          z-index: 1;
        }
        svg {
          color: #a0a8c0;
          font-size: 3rem;
          cursor: pointer;
          filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.2));
        }
        .online-indicator {
          position: absolute;
          bottom: 2px;
          right: 2px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 2px solid #1c1c1c;
          z-index: 2;
          
          &.online {
            background-color: #4caf50;
            box-shadow: 0 0 8px rgba(76, 175, 80, 0.6);
          }
          
          &.offline {
            background-color: #757575;
          }
        }
      }
      .username {
        .user-info {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          
          h3 {
            color: #e0e0e0;
            font-size: 1.1rem;
            font-weight: 500;
            margin: 0;
          }
          
          .status {
            font-size: 0.75rem;
            font-weight: 400;
            
            &.online {
              color: #4caf50;
            }
            
            &.offline {
              color: #757575;
            }
          }
        }
        
        h3 {
          color: #e0e0e0;
          font-size: 1.1rem;
          font-weight: 500;
          margin: 0;
        }
      }
      }
    }
    .selected {
      background-color: #393c41;
      border: 1px solid #5a5d63;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.18);
      &::before {
        opacity: 1;
        background: #6d6d6d;
        box-shadow: 0 0 10px rgba(109, 109, 109, 0.2);
      }
      .username h3 {
        color: #e0e0e0;
        font-weight: 600;
      }
    }
  }
  .current-user {
    background-color: #35373b;
    display: flex;
    gap: 1rem;
    padding: 0.5rem 1rem;
    align-items: center;
    position: relative;
    &::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 50%;
      transform: translateX(-50%);
      width: 80%;
      height: 1px;
      background: #44474d;
    }
    .avatar {
      position: relative;
      img {
        position: relative;
        height: 2.8rem;
        width: 2.8rem;
        border-radius: 50%;
        object-fit: cover;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.18);
        border: 1.5px solid #4285f4; /* thin blue border */
        z-index: 1;
      }
      svg {
        position: relative;
        color: #c8d4f7;
        font-size: 2.8rem;
        cursor: pointer;
        filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.2));
        z-index: 1;
      }
    }
    .username {
      h2 {
        font-size: 1.2rem;
        font-weight: 600;
        margin: 0;
        color: #e0e0e0;
        letter-spacing: 0.5px;
      }
    }
    button {
      border: none;
      background: none;
      position: relative;
      margin-left: 100;
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;
