"use client"

import { useState, useEffect } from "react"
import { subscribeToPosts } from "../firebase/posts"
import PostCard from "./PostCard"
import styles from "./Feed.module.css"

const Feed = ({ currentFilter, currentUser }) => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = subscribeToPosts((snapshot) => {
      const postsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setPosts(postsData)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const filteredPosts = currentFilter === "All" ? posts : posts.filter((post) => post.category === currentFilter)

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Loading posts...</p>
      </div>
    )
  }

  if (filteredPosts.length === 0) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyIcon}>📝</div>
        <h3>No posts yet</h3>
        <p>
          {currentFilter === "All"
            ? "Be the first to share something with your campus community!"
            : `No posts in ${currentFilter} category yet.`}
        </p>
      </div>
    )
  }

  return (
    <div className={styles.feed}>
      {filteredPosts.map((post) => (
        <PostCard key={post.id} post={post} currentUser={currentUser} />
      ))}
    </div>
  )
}

export default Feed
