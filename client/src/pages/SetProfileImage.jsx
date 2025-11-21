import React,{useState,useEffect} from 'react'
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";

import { setAvatarRoute, uploadMedia } from '../utils/APIroute';
import axios from "axios";

export default function SetProfileImage() {
    const navigate = useNavigate();

    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const handleSelectFile = (e) =>{
      setFile(e.target.files[0]);
    }

    const setProfilePicture = async (img) => {
      if (img === null) {
        toast.error("Please select an image", toastOptions);
      } 
      else {
        const user = await JSON.parse(localStorage.getItem('chat-app-user'));
  
        const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
          image: img.secure_url,
        });
  
        if (data.isSet) {
          user.isAvatarImageSet = true;
          user.avatarImage = data.image;
          localStorage.setItem('chat-app-user',JSON.stringify(user));
          navigate("/");
        } 
        else {
          toast.error("Error setting profile image. Please try again.", toastOptions);
        }
      }
    };

    const handleUpload = async () => {
      try {
        setLoading(true);
        
        const data = new FormData();
        data.append("image", file);

        const response = await axios.post(uploadMedia, data);
        setProfilePicture(response.data);
      }

      catch (error) {
        toast.error(error.message, toastOptions);
      }
      finally {
        setLoading(false);
      }
    };

    const existing = ()=>{
        if (!localStorage.getItem('chat-app-user'))
            navigate("/login");
    }

    useEffect(()=>{
        existing()
    },
    [])

  
    const toastOptions = {
      position: "bottom-right",
      autoClose: 8000,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    };


    // Function to generate a random avatar URL based on the username
    const generateAutomaticAvatar = () => {
      setLoading(true);
      try {
        const user = JSON.parse(localStorage.getItem('chat-app-user'));
        const username = user.username || 'user';
        // Generate a random color
        const colors = ['1abc9c', '2ecc71', '3498db', 'e74c3c', 'f1c40f', '9b59b6', '34495e', '16a085', '27ae60', '2980b9'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        // Use DiceBear API to generate avatar
        const avatarUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${username}&backgroundColor=${randomColor}&textColor=ffffff`;
        
        // Set the avatar directly
        setProfilePicture({ secure_url: avatarUrl });
      } catch (error) {
        toast.error("Failed to generate avatar. Please try again.", toastOptions);
      } finally {
        setLoading(false);
      }
    };

    return (
        <FormContainer>
            <div>
                {file && 
                  <center> 
                    <img 
                      src={URL.createObjectURL(file)} 
                      alt="" 
                      height="200" 
                      width="200"
                      style={{
                        borderRadius: '50%',
                        border: '2px solid rgba(0, 0, 0, 0.3)',
                        objectFit: 'cover'
                      }}
                    />
                  </center>
                }
                <div className="avatar-options">
                  <input type="file" id="img" onChange={handleSelectFile} style={{display:"none"}}/>
                  <label htmlFor="img">Upload Profile Picture</label>
                  <button onClick={generateAutomaticAvatar} className="auto-avatar-btn">
                    {loading ? "Generating..." : "Generate Automatic Avatar"}
                  </button>
                </div>
            
            {file && (
              <>
                <button onClick={handleUpload} className="btn-green">
                  {loading ? "uploading..." : "Save"}
                </button>
              </>
            )}
            </div>
            <ToastContainer />
        </FormContainer>
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
  background: linear-gradient(
    to bottom,
    #128c7e 0%,
    #128c7e 20%,
    #DCDCDC 20%,
    #DCDCDC 100%
  );
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: grey;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #ece5dd;
    padding: 3rem 5rem;
  }
  label {
    background-color: white;
    padding: 1rem;
    border: 0.1rem solid white;
    border-radius: 0.4rem;
    color: grey;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid 	#25d366;
      outline: none;
    }
  }
  button {
    background-color: #128c7e;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #075e54;
    }
  }
  span {
    color: grey;
    text-transform: uppercase;
    a {
      color: #128c7e;
      text-decoration: none;
      font-weight: bold;
    }
  }
`
