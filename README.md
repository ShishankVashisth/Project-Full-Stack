# 🧾 Smart GST Billing System

A full-stack **GST Billing & Inventory Management System** built using **Spring Boot (Backend)** and **React + Vite (Frontend)**.
This application allows users to manage products, generate GST invoices, track stock levels, and monitor sales in real-time.

---

## 🚀 Features

### 📦 Product Management

* Add, update, and manage products
* Store price, GST %, and stock quantity
* Search products by name
* Low stock detection

### 🧾 Invoice Management

* Create GST-compliant invoices
* Automatic GST calculation
* Multiple products per invoice
* View all invoices

### 📊 Dashboard

* Total products overview
* Total sales calculation
* Low stock alerts
* Recent invoices

### ⚠️ Low Stock Alerts

* Highlights products with stock < 10
* Critical alert for very low stock

---

## 🛠️ Tech Stack

### Backend

* Java
* Spring Boot
* Spring Data JPA
* MySQL

### Frontend

* React (Vite)
* TypeScript
* Tailwind CSS
* Axios
* React Router DOM

---

## 🏗️ Project Architecture

```text
Frontend (React - Vite)
        ↓
REST API (Spring Boot)
        ↓
Database (MySQL)
```

---

## ⚙️ Setup Instructions

### 🔹 1. Clone Repository

```bash
git clone https://github.com/your-username/gst-billing-system.git
cd gst-billing-system
```

---

### 🔹 2. Backend Setup (Spring Boot)

```bash
cd backend
mvn spring-boot:run
```

👉 Runs on: `http://localhost:8080`

---

### 🔹 3. Frontend Setup (React + Vite)

```bash
cd frontend
npm install
npm run dev
```

👉 Runs on: `http://localhost:5173`

---

## 🔗 API Endpoints

### Product APIs

* `GET /products` → Get all products
* `POST /products` → Add product
* `GET /products/search?name=` → Search product
* `GET /products/low-stock` → Low stock products

### Invoice APIs

* `POST /invoices` → Create invoice
* `GET /invoices` → Get all invoices

---

## 📸 Screenshots

* Dashboard
* Product Management
* Invoice Creation
* Invoice View

*(Add screenshots here for better presentation)*

---

## 🧠 Key Highlights

* Full-stack architecture
* Real-time data handling
* REST API integration
* Clean UI with reusable components
* Scalable design

---

## 🚀 Future Enhancements

* PDF invoice download
* Authentication (Login/Signup)
* Role-based access
* Cloud deployment (Render / Railway)
* Analytics dashboard

---

## 👨‍💻 Author

**Shishank Vashisth**

---
