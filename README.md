# Photo Studio & Portfolio Platform

A modern, full-stack web application designed for photographers and creative professionals to showcase their portfolio, manage services, handle customer bookings, and customize their website's theme and content dynamically.

## 🚀 Features

### Public Facing (Client)
*   **Stunning Portfolio:** Categorized image galleries with smooth animations (Framer Motion).
*   **Service Offerings:** Detailed list of photography/creative services with pricing and deliverables.
*   **Booking System:** Comprehensive booking inquiry form capturing event details, budget, and special requirements.
*   **Contact Section:** Direct contact form for general inquiries.
*   **Responsive Design:** Fully mobile-responsive UI built with Tailwind CSS v4.

### Admin Dashboard
*   **Secure Authentication:** JWT-based login for administrators.
*   **Analytics Dashboard:** Visual representation of bookings and queries using Chart.js.
*   **Booking Management:** View, update status, and manage client bookings and inquiries. Includes PDF generation for invoices/receipts.
*   **Gallery Management:** Upload images (via Cloudinary), create categories, and feature specific photos.
*   **Service Management:** Create, edit, and toggle availability of services.
*   **Site Settings:** Dynamically update site name, logo, contact information, social links, and website theme (e.g., luxury-gold).
*   **Query Management:** Handle direct contact form submissions.

## 🛠️ Technology Stack

**Frontend (Client):**
*   **Framework:** React 19 + Vite
*   **Styling:** Tailwind CSS v4, PostCSS
*   **Animations:** Framer Motion
*   **Routing:** React Router DOM v7
*   **State Management/Data Fetching:** Axios
*   **Charts:** Chart.js, react-chartjs-2
*   **Icons:** React Icons
*   **Export:** XLSX (for exporting tabular data)

**Backend (Server):**
*   **Runtime:** Node.js (v18+)
*   **Framework:** Express.js
*   **Database ORM:** Prisma
*   **Database:** PostgreSQL
*   **Authentication:** JSON Web Tokens (JWT), bcryptjs
*   **File Storage:** Cloudinary, Multer
*   **Email Services:** Nodemailer
*   **Document Generation:** PDFKit
*   **Security & Middleware:** Helmet, CORS, Morgan, dotenv

## 📁 Project Structure

```text
photo-studio-app/
├── client/                 # Frontend React Application
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Public facing pages (Home, Portfolio, etc.)
│   │   │   └── admin/      # Admin dashboard pages
│   │   ├── App.jsx         # Main application routing
│   │   └── main.jsx        # React entry point
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
├── server/                 # Backend Node.js/Express Application
│   ├── api/                # Vercel Serverless entry point
│   ├── prisma/             # Database schema and migrations
│   │   └── schema.prisma
│   ├── src/
│   │   ├── controllers/    # Route logic
│   │   ├── middlewares/    # Auth, upload, and error handling middlewares
│   │   ├── routes/         # API endpoint definitions
│   │   └── index.js        # Express app setup
│   ├── uploads/            # Temporary local file storage
│   ├── package.json
│   └── .env                # Server environment variables
├── vercel.json             # Vercel deployment configuration
└── README.md
```

## ⚙️ Prerequisites

Before you begin, ensure you have the following installed:
*   [Node.js](https://nodejs.org/) (v18.0.0 or higher)
*   npm or yarn
*   [PostgreSQL](https://www.postgresql.org/) database
*   [Cloudinary](https://cloudinary.com/) account (for image hosting)

## 💻 Local Development Setup

### 1. Clone the repository
```bash
git clone <repository-url>
cd photo-studio-app
```

### 2. Backend Setup
```bash
cd server
npm install
```

Create a `.env` file in the `server` directory and add the following variables:
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/photodb?schema=public"

# Authentication
JWT_SECRET="your_super_secret_jwt_key"
JWT_EXPIRES_IN="7d"

# Cloudinary Setup (for Image Uploads)
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"

# Email Setup (Nodemailer)
SMTP_HOST="smtp.example.com"
SMTP_PORT=587
SMTP_USER="your_email@example.com"
SMTP_PASS="your_email_password"

# Server Port
PORT=5000
```

Initialize the database using Prisma:
```bash
npx prisma generate
npx prisma db push
```

Start the backend development server:
```bash
npm run dev
```
The server will run on `http://localhost:5000`.

### 3. Frontend Setup
Open a new terminal window/tab:
```bash
cd client
npm install
```

Create a `.env` file in the `client` directory (if needed, typically Vite uses `.env` with `VITE_` prefix):
```env
VITE_API_BASE_URL="http://localhost:5000/api"
```

Start the frontend development server:
```bash
npm run dev
```
The application will run on `http://localhost:5173`.

## 🌐 API Endpoints Overview

The backend provides RESTful API endpoints grouped by feature:

*   **`/api/auth`**: Login, Registration, User verification.
*   **`/api/bookings`**: Create, read, update, delete client bookings.
*   **`/api/categories`**: Manage portfolio categories.
*   **`/api/gallery`**: Upload and manage portfolio images.
*   **`/api/services`**: Manage service offerings and pricing.
*   **`/api/settings`**: Get and update global site settings.
*   **`/api/dashboard`**: Fetch aggregated statistics for the admin panel.
*   **`/api/upload`**: Handle file uploads to Cloudinary.

## 🚀 Deployment

This project is configured for seamless deployment on **Vercel**.

1.  Push your code to a GitHub repository.
2.  Connect your repository to Vercel.
3.  Vercel will automatically detect the configuration from `vercel.json`.
4.  Ensure you add all the **Server Environment Variables** to your Vercel project settings.
5.  The `vercel.json` file handles routing requests to the frontend static files and `/api/*` requests to the serverless Express functions.
6.  The build command is set to `cd client && npm run build` and output directory is `client/dist`.

## 📝 License
This project is licensed under the ISC License.
