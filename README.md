
# Freelance Dashboard (React + TypeScript)

A mini-dashboard that displays **clients**, **projects**, and **payments** using **React**, **TypeScript**, **Context API**, and **useReducer** for type-safe state management.

---

## Technologies Used

- **React 18** + **TypeScript**
- **Context API** + **useReducer**
- **Tailwind CSS** 
- **Vite** 

---

## Main Features

- Type-safe models for `Client`, `Project`, and `Payment`
- Global state with **discriminated union actions**
- Mark unpaid projects as **paid**
- Search clients & projects
- Dashboard stats (total, paid, unpaid, revenue)
- Color-coded status badges
- Safe client lookup (`Client not found`)
- 8+ typed utility functions

---

## Setup Instructions

1. **Clone the repo**
   ```bash
   git clone https://github.com/pshemssa/freelance-dashboard.git
   cd freelance-dashboard
   cd freelancer    ## folder holding the project

**Folder Structure**

src/

├── components/     → Reusable UI components

├── context/        → Global state (Context + useReducer)

├── data/           → Dummy data

├── types/          → TypeScript interfaces

├── utils/          → Helper functions

└── App.tsx         → Main layout


2. **Install dependencies**
    npm install

3. **Run locally**
    npm run dev

Open: http://localhost:5173

0r Open the hosted version : https://freelance-dashboard-mqrp.vercel.app/ 
