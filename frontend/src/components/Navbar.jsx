"use client"

import styles from "./Navbar.module.css"

const Navbar = ({ currentFilter, onFilterChange, userName, onLogout }) => {
  const categories = ["All", "Events", "Lost & Found", "General"]

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <h1>🎓 Campus Connect</h1>
        </div>

        <div className={styles.filters}>
          {categories.map((category) => (
            <button
              key={category}
              className={`${styles.filterBtn} ${currentFilter === category ? styles.active : ""}`}
              onClick={() => onFilterChange(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className={styles.user}>
          <span className={styles.userName}>👋 {userName}</span>
          <button className={styles.logoutBtn} onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
