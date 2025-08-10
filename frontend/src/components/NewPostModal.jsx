"use client"

import { useState } from "react"
import { createPost } from "../firebase/posts"
import styles from "./NewPostModal.module.css"

const NewPostModal = ({ isOpen, onClose, currentUser }) => {
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("General")
  const [description, setDescription] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim() || !description.trim()) return

    setIsSubmitting(true)
    try {
      await createPost({
        title: title.trim(),
        category,
        description: description.trim(),
        author: currentUser,
      })

      // Reset form
      setTitle("")
      setCategory("General")
      setDescription("")
      onClose()
    } catch (error) {
      console.error("Error creating post:", error)
      alert("Failed to create post. Please try again.")
    }
    setIsSubmitting(false)
  }

  if (!isOpen) return null

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>Create New Post</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What's your post about?"
              className={styles.input}
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={styles.select}
            >
              <option value="General">General</option>
              <option value="Events">Events</option>
              <option value="Lost & Found">Lost & Found</option>
            </select>
          </div>

          <div className={styles.field}>
            <label htmlFor="description">Description ({description.length}/200)</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell us more about it..."
              className={styles.textarea}
              maxLength={200}
              rows={4}
              required
            />
          </div>

          <div className={styles.actions}>
            <button type="button" onClick={onClose} className={styles.cancelBtn} disabled={isSubmitting}>
              Cancel
            </button>
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={isSubmitting || !title.trim() || !description.trim()}
            >
              {isSubmitting ? "Posting..." : "Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewPostModal
