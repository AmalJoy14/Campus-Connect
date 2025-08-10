"use client"

import { useState, useEffect } from "react"
import Login from "./components/Login"
import Navbar from "./components/Navbar"
import Feed from "./components/Feed"
import NewPostModal from "./components/NewPostModal"
import styles from "./App.module.css"

function App() {
  const [user, setUser] = useState(null)
  const [currentFilter, setCurrentFilter] = useState("All")
  const [showNewPostModal, setShowNewPostModal] = useState(false)

  useEffect(() => {
    const savedUser = localStorage.getItem("campusConnectUser")
    if (savedUser) {
      setUser(savedUser)
    }
  }, [])

  const handleLogin = (userName) => {
    setUser(userName)
  }

  const handleLogout = () => {
    localStorage.removeItem("campusConnectUser")
    setUser(null)
  }

  if (!user) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <div className={styles.app}>
      <Navbar currentFilter={currentFilter} onFilterChange={setCurrentFilter} userName={user} onLogout={handleLogout} />

      <main className={styles.main}>
        <Feed currentFilter={currentFilter} currentUser={user} />
      </main>

      <button className={styles.fab} onClick={() => setShowNewPostModal(true)} title="Create new post">
        ✏️
      </button>

      <NewPostModal isOpen={showNewPostModal} onClose={() => setShowNewPostModal(false)} currentUser={user} />
    </div>
  )
}

export default App
