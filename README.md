# 💬 Ping Chat

A real-time chat application built with React.js and Node.js, featuring instant messaging, image sharing, and online status tracking.

## ✨ Features

- **Real-time Messaging**: Instant text and image messaging using Socket.IO
- **User Authentication**: Secure login and registration system
- **Profile Management**: Custom avatar upload and profile settings
- **Online Status**: See who's online in real-time
- **Image Sharing**: Upload and share images instantly
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Clean and intuitive user interface with animations

## 🚀 Tech Stack

### Frontend
- **React.js** - User interface
- **Socket.IO Client** - Real-time communication
- **Axios** - HTTP requests
- **Styled Components** - Styling
- **React Router** - Navigation
- **React Toastify** - Notifications
- **Emoji Picker React** - Emoji support

### Backend
- **Node.js** - Server runtime
- **Express.js** - Web framework
- **Socket.IO** - Real-time communication
- **MongoDB** - Database
- **Mongoose** - Database ODM
- **Cloudinary** - Image storage
- **Bcrypt** - Password hashing
- **CORS** - Cross-origin requests
- **Multer** - File upload handling

## 📸 Screenshots

| Login Page | Chat Interface | Contact List |
|------------|----------------|--------------|
| ![Login](https://github.com/user-attachments/assets/0cc307ff-e6c2-4b79-a35f-4dbe8e3e8dd8) | ![Chat](https://github.com/user-attachments/assets/10531e68-355e-45a8-a4c9-9dc20f7c7cc2) | ![Contacts](https://github.com/user-attachments/assets/4830e209-0613-4389-a981-c222934a84a8) |
| ![Register](https://github.com/user-attachments/assets/7323b3d5-f8c6-4d8f-8220-c59a72b8fdc8) | ![Emoji Picker](https://github.com/user-attachments/assets/9003c635-0fb0-46bb-adba-161d94c98afd) | |



## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- Cloudinary account (for image uploads)

### 1. Clone the repository
```bash
git clone https://github.com/sudarshanred05/Ping-Chat.git
cd Ping-Chat
```

### 2. Backend Setup
```bash
cd server
npm install
```

Create a `.env` file in the server directory:
```env
PORT=5000
MONGO_URL=your_mongodb_connection_string
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
```

### 3. Frontend Setup
```bash
cd ../client
npm install
```

Update the API routes in `client/src/utils/APIroute.js` if needed:
```javascript
export const host = "http://localhost:5000";
```

### 4. Run the Application

Start the backend server:
```bash
cd server
npm start
```

Start the frontend (in a new terminal):
```bash
cd client
npm start
```

The application will be available at:
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`

## 📱 Usage

1. **Register**: Create a new account with username, email, and password
2. **Set Avatar**: Choose a profile picture from the avatar gallery
3. **Login**: Sign in with your credentials
4. **Start Chatting**: Select a contact and start messaging
5. **Send Images**: Click the '+' button to upload and send images
6. **Real-time Updates**: See messages and online status in real-time

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/setavatar/:id` - Set user avatar
- `GET /api/auth/allusers/:id` - Get all users except current
- `GET /api/auth/logout/:id` - User logout

### Messages
- `POST /api/messages/addmsg` - Send text message
- `POST /api/messages/getmsg` - Get messages between users
- `POST /api/messages/addImageMessage` - Send image message

### Cloud Storage
- `POST /api/cloud/upload` - Upload image to Cloudinary

## 🌐 Socket Events

### Client to Server
- `add-user` - Add user to online users
- `send-msg` - Send message to recipient
- `send-notification` - Send notification

### Server to Client
- `msg-recieve` - Receive message
- `notification-recieve` - Receive notification
- `user-online` - User comes online
- `user-offline` - User goes offline
- `online-users-list` - Get list of online users

## 🎨 Project Structure

```
Ping-Chat/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── utils/         # Utility functions
│   │   ├── assets/        # Images and assets
│   │   └── configs/       # Configuration files
│   └── package.json
├── server/                # Node.js backend
│   ├── controllers/       # Route controllers
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   └── package.json
└── README.md
```

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



## 👨‍💻 Author

**Sudarshan Reddy**
- GitHub: [@sudarshanred05](https://github.com/sudarshanred05)

## 🙏 Acknowledgments

- Socket.IO for real-time communication
- MongoDB for database
- Cloudinary for image storage
- React community for amazing tools and libraries

---

⭐ Star this repo if you find it helpful!
