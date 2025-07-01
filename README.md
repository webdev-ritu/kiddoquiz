# 🎉 KiddoQuiz – Fun Learning for Kids!

KiddoQuiz is an engaging and educational quiz app designed for children. It offers fun categories, real-time feedback with sounds, animated visuals, and a playful user interface to make learning enjoyable. Built with **React + Vite** and powered by **Firebase**.

---

## 🚀 Features

- 👶 Kid-friendly animated UI
- 📚 Quiz categories with interactive questions
- ✅ Real-time feedback with sound effects
- 📈 Progress tracking (dashboard)
- 🌐 Multi-language support (English 🇺🇸 / Hindi 🇮🇳)
- 🔐 Firebase Auth (Signup/Login/Profile)
- ☁️ Firebase Hosting + Firestore (data)
- 🎵 Background music & celebration effects
- 🧑‍💻 Responsive design for mobile, tablet, and desktop

---
##📸 Screenshots
![image](https://github.com/user-attachments/assets/0fedea3a-be5e-4fb2-86b6-8e7a169a0a72)

## 🌐 Live Demo

Check out the live deployed version of KiddoQuiz here:  
[https://kiddoquiz-ced8c.web.app/](https://kiddoquiz-ced8c.web.app)

## 🛠 Tech Stack

| Frontend     | Backend / Services |
|--------------|--------------------|
| React + Vite | Firebase Auth      |
| Bootstrap    | Firestore Database |
| Framer Motion| Firebase Hosting   |
| Lottie Files | Firebase Storage   |
| Howler.js    |                    |

---

## 📦 Installation

```bash
git clone https://github.com/your-username/kiddoquiz.git
cd kiddoquiz
npm install

##🔧 Setup
1. Add your .env file in the root:
bash
Copy code
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-msg-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_MEASUREMENT_ID=your-measure-id

##📁 Project Structure
pgsql
Copy code
kiddoquiz/
├── public/
├── src/
│   ├── assets/
│   │   ├── audio/
│   │   ├── images/
│   │   └── lottie/
│   ├── components/
│   ├── pages/
│   ├── config/
│   ├── hooks/
│   ├── contexts/
│   └── styles/
├── .env
├── .gitignore
├── firebase.json
├── package.json
└── README.md

##🚀 Firebase Deployment
bash
Copy code
npm run build
firebase deploy

##❤️ Support
If you enjoy this project, please ⭐ it on GitHub or share it with others!
