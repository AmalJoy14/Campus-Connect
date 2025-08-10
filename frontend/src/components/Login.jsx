"use client"

import { useState } from "react"
import styles from "./Login.module.css"

const Login = ({ onLogin }) => {
  const [name, setName] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name.trim()) {
      localStorage.setItem("campusConnectUser", name.trim())
      onLogin(name.trim())
    }
  }

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <h1 className={styles.title}>🎓 Campus Connect</h1>
        <p className={styles.subtitle}>Connect with your campus community</p>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
            required
          />
          <button type="submit" className={styles.button}>
            Join Campus Connect
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
