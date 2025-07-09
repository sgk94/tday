# 🥋 T Day - Taekwondo Tournament Organizer

**T Day** is a web-based platform for organizing and managing Taekwondo tournaments. It helps event coordinators streamline registration, bracket management, and day-of logistics with minimal technical overhead.

Built using React, Firebase, and Tailwind CSS.

---

## ⚙️ Tech Stack

- 🧩 **Frontend**: React (with Vite)
- 🎨 **Styling**: Tailwind CSS
- 🗂️ **State Management**: Zustand
- 🔐 **Authentication**: Firebase Auth
- 🔥 **Database**: Firestore
- 🛠 **Backend**: Firebase Cloud Functions (Node 24 via Blaze plan)
- 🛡 **Role-Based Access**: Firebase Auth Custom Claims
- 🌐 **Hosting**: Firebase Hosting (optional)
- 🖼 **Icons**: Lucide React

---

## 🗃 Project Structure

```
src/
├── components/         # Reusable UI components
├── context/            # AuthContext for user & claims
├── pages/              # Route-based page components
├── routes/             # ProtectedRoute guards
├── store/              # Zustand state
├── utils/              # Utility functions
```

---

## ✨ Features

- 🔐 Role-based login and access using Firebase Custom Claims
- 📝 Create, edit, and view tournament data
- ⚡ Real-time Firestore updates
- 💾 Local state caching with Zustand
- 🧭 Organizer dashboard interface
- 🧱 Planned: bracket editing, check-in flows, and more

---

## 🛠 Local Development

1. **Clone the repo**

```
git clone https://github.com/sgk94/t-day.git
cd t-day
npm install
```

2. **Firebase setup**

- 🔧 Create a Firebase project
- ✅ Enable Authentication (Email/Password)
- 🔥 Enable Firestore
- ⚙️ Enable Cloud Functions (Blaze plan)
- 🧾 Add Firebase config to `src/firebase.ts` or use environment variables

3. **Start the dev server**

```
npm run dev
```

---

## 👥 Role Management

To assign roles like **organizer**, use the Firebase Admin SDK or a Cloud Function:

```js
// Example using Firebase Admin SDK
admin.auth().setCustomUserClaims(uid, {
  role: "organizer",
});
```

Roles are read via `AuthContext` and used in route guards to restrict access.

---

## 🗺 Roadmap

- [x] 📝 Tournament creation form (`/tournaments/create`)
- [x] 🛡 Role-based access with Firebase Custom Claims
- [x] 🧠 AuthContext with claim handling
- [ ] 🧮 Live bracket updates and real-time match editing
- [ ] ✅ Competitor self check-in portal
- [ ] 🧑‍💼 Organizer control panel/dashboard
- [ ] 🖨 Printable certificates and results reports
- [ ] 📴 Offline support for check-in and scoring

---

## 📄 License

MIT © Shawn Kim
