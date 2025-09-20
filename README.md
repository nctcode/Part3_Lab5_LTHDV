# 🏭 Supplier-Product Management Web App

[![Node.js](https://img.shields.io/badge/Node.js-v22.16.0-green)](https://nodejs.org/)  
[![MongoDB](https://img.shields.io/badge/MongoDB-v6.0.0-brightgreen)](https://www.mongodb.com/)  
[![License](https://img.shields.io/badge/License-MIT-blue)](LICENSE)  
[![Swagger](https://img.shields.io/badge/Swagger-API-blueviolet)](http://localhost:3000/api-docs)

---

## 🌟 Overview
Ứng dụng quản lý **suppliers** và **products** với **GUI** và **RESTful API**.  
- Admin phải **login** để CRUD sản phẩm và nhà cung cấp.  
- API được document với **Swagger**.  
- Tìm kiếm và lọc sản phẩm theo nhà cung cấp.

---

## 🛠 Features

### 🏢 Supplier Management
- **Attributes**:
  - `name` (Tên) **required**
  - `address` (Địa chỉ)
  - `phone` (Số điện thoại)
- CRUD trên **GUI** và **Swagger**

### 📦 Product Management
- **Attributes**:
  - `name` (Tên sản phẩm) **required**
  - `price` (Giá)
  - `quantity` (Số lượng)
  - `supplier` (tham chiếu đến nhà cung cấp)
- Lọc theo supplier
- Tìm kiếm theo tên
- CRUD trên **GUI** và **Swagger**

### 🔐 User Authentication
- **Register**, **Login**, **Forgot Password**, **Logout**
- Sử dụng **cookies + session**
- Chỉ người dùng đã login mới CRUD products & suppliers

### 🏠 Homepage
- Hiển thị danh sách sản phẩm
- Filter theo supplier
- Search theo tên sản phẩm

---

## 💻 Tech Stack

| Layer         | Technology |
|---------------|------------|
| Backend       | Node.js, Express.js, MongoDB, Mongoose |
| Frontend      | EJS, Bootstrap 5 |
| Authentication| express-session, connect-mongo, bcryptjs |
| API Docs      | Swagger UI |

---

## ⚡ Run Project

```bash
# Clone repo
git clone https://github.com/nctcode/Part3_Lab5_LTHDV.git
cd supplier-product-app

# Install dependencies
npm install

# Create .env
DATABASE_URL=mongodb://127.0.0.1:27017/supplier-product-app
SESSION_SECRET=your_secret_key
PORT=3000

# Run app
node app.js

#GUI: http://localhost:3000

#Swagger API: http://localhost:3000/api-docs



