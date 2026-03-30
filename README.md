# Top-Up & Withdraw Management System

A real-time, secure financial management system custom-built for gaming platforms. 

The architecture contains three primary, fully isolated environments:
1. **NestJS Backend API** (`/backend`)
2. **React Vite Admin Panel** (`/admin-panel`)
3. **React Native Mobile App** (`/mobile-app`)

---

## 🏗️ System Architecture & Stack

### Backend (`/backend`)
- **Framework**: Node.js + NestJS
- **Database**: PostgreSQL (Prisma ORM v5)
- **Security**: JWT Authentication, Role-based Route Guards (`@Roles`), AES-256 Symmetric Encryption (for decryptable Game Passwords), API Rate Limiting, and CORS protection.
- **Real-Time Engine**: Socket.io (`EventsGateway`) for live queues.

### Admin Panel (`/admin-panel`)
- **Framework**: React 18 + Vite + TypeScript
- **Styling**: Tailwind CSS
- **Routing**: `react-router-dom` with strict `<ProtectedRoute>` enclosures.
- **Real-Time Integration**: Socket.io-client to seamlessly accept WebSocket dashboard updates.

### Mobile App (`/mobile-app`)
- **Framework**: Bare React Native (CLI initialized)
- **Routing**: React Navigation (Bottom Tabs)

---

## 🔍 Final Analysis & Missing Pieces (Errors/Gaps)

While the entire application compiles with **Zero TypeScript Errors** and the logical scaffolding perfectly matches the PRD, there are a few functional optimization gaps remaining before pure production deployment:

### 1. Mocked Axios Connectors
- **Admin Panel**: The frontend UI for the Dashboard, Games, and Payments currently uses **mocked local state data**. The `axios.get(...)` calls must be actively uncommented and mapped respectively to their NestJS counterparts (`/games`, `/payment-methods`, `/orders/topup/my`).
- **Mobile App**: The Top-Up and Withdraw screens contain local Form states, but the `submit` handler needs to fire Axios REST posts containing the JWT token.

### 2. Form Validations
We rely heavily on backend NestJS `ValidationPipes`. To optimize user experience (UX), the React and React Native frontends should adopt validation libraries directly onto the input screens (e.g. `Formik` + `Yup` or `react-hook-form`).

### 3. State Management
Right now, API responses are managed by fragmented `useState` instances. Integrating a global cache like **React Query (@tanstack/queries)** or **Zustand** will drastically reduce duplicate loading states and standardize WebSocket merges.

---

## 🚀 How to Run the Ecosystem

### 1. Backend API
```bash
cd backend
npm install

# Apply your Prisma schema to PostgreSQL
npx prisma db push
npx prisma generate

# Run the API on http://localhost:3000
npm run start:dev
```

### 2. Admin Panel
```bash
cd admin-panel
npm install

# Run the Vite server on http://localhost:5173
npm run dev
```

### 3. Mobile App
```bash
cd mobile-app
npm install

# Launching on Emulator
npx react-native run-android
# OR
npx react-native run-ios
```
