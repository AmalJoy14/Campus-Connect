"use client"

import { useState } from "react"
import { toggleLike, addComment } from "../firebase/posts"
import styles from "./PostCard.module.css"

const PostCard = ({ post, currentUser }) => {
  const [showComments, setShowComments] = useState(false)
  const [newComment, setNewComment] = useState("")
  const [isLiking, setIsLiking] = useState(false)

  const handleLike = async () => {
    if (isLiking) return
    setIsLiking(true)
    try {
      await toggleLike(post.id, currentUser)
    } catch (error) {
      console.error("Error toggling like:", error)
    }
    setIsLiking(false)
  }

  const handleComment = async (e) => {
    e.preventDefault()
    if (!newComment.trim()) return

    try {
      await addComment(post.id, {
        text: newComment.trim(),
        author: currentUser,
      })
      setNewComment("")
    } catch (error) {
      console.error("Error adding comment:", error)
    }
  }

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "Just now"
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
    return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const getCategoryColor = (category) => {
    switch (category) {
      case "Events":
        return "#4ecdc4"
      case "Lost & Found":
        return "#ff6b6b"
      case "General":
        return "#45b7d1"
      default:
        return "#95a5a6"
    }
  }

  const isLiked = post.likes?.includes(currentUser)

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.userInfo}>
          <div className={styles.avatar}>{post.author?.charAt(0).toUpperCase()}</div>
          <div>
            <div className={styles.author}>{post.author}</div>
            <div className={styles.timestamp}>{formatTimestamp(post.createdAt)}</div>
          </div>
        </div>
        <div className={styles.category} style={{ backgroundColor: getCategoryColor(post.category) }}>
          {post.category}
        </div>
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{post.title}</h3>
        <p className={styles.description}>{post.description}</p>
      </div>

      <div className={styles.actions}>
        <button
          className={`${styles.actionBtn} ${isLiked ? styles.liked : ""}`}
          onClick={handleLike}
          disabled={isLiking}
        >
          {isLiked ? "❤️" : "🤍"} {post.likes?.length || 0}
        </button>
        <button className={styles.actionBtn} onClick={() => setShowComments(!showComments)}>
          💬 {post.comments?.length || 0}
        </button>
      </div>

      {showComments && (
        <div className={styles.commentsSection}>
          <div className={styles.comments}>
            {post.comments?.map((comment, index) => (
              <div key={index} className={styles.comment}>
                <strong>{comment.author}:</strong> {comment.text}
              </div>
            ))}
          </div>
          <form onSubmit={handleComment} className={styles.commentForm}>
            <input
              type="text"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className={styles.commentInput}
              maxLength={200}
            />
            <button type="submit" className={styles.commentSubmit}>
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default PostCard
