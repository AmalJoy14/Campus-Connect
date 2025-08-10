import {
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  doc,
  arrayUnion,
  arrayRemove,
  serverTimestamp,
} from "firebase/firestore"
import { db } from "./config"

export const createPost = async (postData) => {
  try {
    const docRef = await addDoc(collection(db, "posts"), {
      ...postData,
      createdAt: serverTimestamp(),
      likes: [],
      comments: [],
    })
    return docRef.id
  } catch (error) {
    console.error("Error creating post:", error)
    throw error
  }
}

export const subscribeToPosts = (callback) => {
  const q = query(collection(db, "posts"), orderBy("createdAt", "desc"))
  return onSnapshot(q, callback)
}

export const toggleLike = async (postId, userName) => {
  const postRef = doc(db, "posts", postId)
  try {
    // First, we need to check if user already liked
    // For simplicity, we'll use arrayUnion/arrayRemove
    await updateDoc(postRef, {
      likes: arrayUnion(userName),
    })
  } catch (error) {
    // If user already liked, remove the like
    await updateDoc(postRef, {
      likes: arrayRemove(userName),
    })
  }
}

export const addComment = async (postId, comment) => {
  const postRef = doc(db, "posts", postId)
  await updateDoc(postRef, {
    comments: arrayUnion({
      ...comment,
      timestamp: new Date().toISOString(),
    }),
  })
}
