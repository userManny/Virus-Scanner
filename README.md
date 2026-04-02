# 🦠 Virus Scanner Game

An interactive grid-based puzzle game inspired by Minesweeper, built using React.
Scan files, detect hidden viruses, and secure the system without triggering infection.

---

## 🎮 Features
🧠 Smart Grid Logic – Dynamic virus placement with guaranteed safe first click
🔍 Recursive Reveal (Flood Fill) – Automatically reveals safe zones
🎯 Scoring System – Tracks correctly identified infected files
⏱ Real-Time Timer – Measures gameplay performance
🎉 Win Animation Overlay – Smooth UI feedback on success
🚩 Flagging Mechanism – Mark suspicious files
🎨 Modern UI – Violet-blue theme with hover effects and transitions
⚛️ React-Based Architecture – Component-driven design using hooks

---

## 🛠️ Tech Stack
Frontend: React (Hooks: useState, useEffect)
Styling: CSS (Grid, animations, transitions)
Build Tool: Vite

---

## 🧩 How It Works
The grid contains hidden viruses randomly distributed.
The first click is always safe, with a protected 3×3 area.
Each cell shows the number of infected neighbors.
Use logic to avoid viruses and reveal all safe cells.
Flag suspected infected files to increase your score.

---

## 🚀 Live Demo
👉 https://virus-scanner-three.vercel.app/

---

## 🎯 Gameplay Rules
Left click → Reveal a file
Right click → Flag a file
Numbers indicate nearby infected files
Reveal all safe files to win
Clicking a virus results in system failure

---

## ⚙️ Installation & Setup

 Clone the repository git clone:  https://github.com/userManny/Virus-Scanner.git
 Navigate into project            cd virus-scanner
 Install dependencies             npm install
 Run development server           npm run dev
