# Simple Expense Tracker — Full Stack Web App

A clean and user-friendly **Expense Tracking Web Application** built with:

- **React** (Frontend)
- **Node.js + Express** (Backend)
- **MongoDB Atlas** (Database)
- **JWT Authentication**
- **Render (Backend Hosting)**
- **Vercel (Frontend Hosting)**

This project allows users to add, edit, delete, and categorize expenses with a smooth UI and real-time updates.

---

## 🚀 Live Demo

### 🔹 Frontend  
https://simple-expense-tracker-coral.vercel.app

### 🔹 Backend API  
https://simple-expense-tracker-backend.onrender.com

---

## 📊 Features

### ✅ User Authentication
- Register & login with JWT  
- Secure API endpoints  
- Protected expense routes

### ✅ Expense Management
- Add new expenses  
- Edit existing expenses  
- Delete expenses  
- Categories included (Food, Transport, Shopping, Bills, etc.)

### ✅ Smart Display
- Automatically groups expenses:
  - **This Month**
  - **Last Month**
  - **Older Expenses**
- “**See All / Show Less**” for long lists  
- Date input **cannot select future dates**

### ✅ UI & UX
- Always light mode  
- Clean white cards on grey background  
- Colored buttons for Add, Edit, Delete, Filter  
- Mobile-responsive layout  
- Smooth transitions and shadows

---

## 🧱 Tech Stack

### Frontend
- React  
- Axios  
- Chart.js (optional dashboard features)  
- Custom CSS

### Backend
- Node.js  
- Express  
- MongoDB + Mongoose  
- JWT for authentication  
- CORS

### Deployment
- **Frontend:** Vercel  
- **Backend:** Render  
- **Database:** MongoDB Atlas

---

## 📁 Project Structure

```
project-root/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── api.js
    │   ├── App.js
    │   ├── App.css
    │   └── index.js
    └── package.json
```

---

## ⚙️ Installation & Setup (Local Development)

### 1. Clone the repository
```bash
git clone https://github.com/SaiOakkarMaung/simple_expense_tracker.git
cd simple_expense_tracker
```

---

## Backend Setup
```
cd backend
npm install
```

Create a `.env` file:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run the server:
```
npm start
```

Backend runs on **http://localhost:5000**

---

## Frontend Setup
```
cd frontend
npm install
npm start
```

Frontend runs on **http://localhost:3000**

---

## 🌍 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|--------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |

### Expenses (Protected)
| Method | Endpoint | Description |
|--------|----------|--------------|
| GET | `/api/expenses` | Get all expenses |
| POST | `/api/expenses` | Add expense |
| PUT | `/api/expenses/:id` | Update expense |
| DELETE | `/api/expenses/:id` | Delete expense |

---

## 🧪 Future Improvements
- Monthly summary charts  
- PDF/CSV export  
- Income tracking  
- Search & filter features  
- Dark mode toggle  
- Budget goals  
- Category-based analytics  

---

## 👨‍💻 Author
**SAI OAKKAR MAUNG**  
Full-Stack Developer (React + Node.js)
