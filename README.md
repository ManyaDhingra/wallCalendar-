# 📅 Interactive Wall Calendar

An interactive, responsive wall calendar inspired by physical calendar layouts.
Built using **Next.js, TypeScript, Tailwind CSS, and Framer Motion**, this project focuses on clean UI, smooth interactions, and real-world usability.

---

## ✨ Features

* 📆 **Date Range Selection**

  * Select start and end dates
  * Visual highlighting with smooth hover preview

* 📝 **Notes System**

  * Add notes to selected date ranges
  * Click on a date to view saved notes

* 💾 **Persistent Storage**

  * Notes are stored in `localStorage`
  * Data persists after refresh

* 📍 **Visual Indicators**

  * Dates with notes show a subtle dot
  * Current day is highlighted

* 🎭 **Animations**

  * Smooth transitions using Framer Motion
  * Flip-style hero animation

* 🌙 **Dark Mode**

  * Toggle between light and dark themes

* 📱 **Responsive Design**

  * Optimized for both desktop and mobile

---

## 🧱 Tech Stack

* **Next.js (App Router)**
* **TypeScript**
* **Tailwind CSS**
* **Framer Motion**

---

## 🧠 Design & Implementation Choices

* **Component-Based Architecture**

  * Split into reusable components like `Hero`, `DayCell`, etc.

* **State Management**

  * Managed using React hooks (`useState`, `useEffect`)
  * Clean separation of logic for selection and notes

* **User Experience Focus**

  * Hover previews for date range
  * Smooth animations for interactions
  * Minimal and clean UI inspired by real-world calendars

* **Local Storage**

  * Used for persistence instead of backend for simplicity

---

## 🚀 Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open http://localhost:3000 with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

---

## 📦 Installation

```bash
git clone https://github.com/ManyaDhingra/wallCalendar-.git
cd wallCalendar-
npm install
npm run dev
```

---

## 📌 Future Improvements

* Drag-to-select date ranges
* Edit/Delete notes
* Holiday API integration
* Weekly view support

---

# 🔽 Default Next.js Info (Retained)

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Learn More

To learn more about Next.js, take a look at the following resources:

* https://nextjs.org/docs
* https://nextjs.org/learn

## Deploy on Vercel

The easiest way to deploy your Next.js app is using Vercel:

https://vercel.com/new
