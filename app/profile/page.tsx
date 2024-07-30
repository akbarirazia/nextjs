"use client"

import { useEffect, useState } from "react"
import axios from "../../lib/api/api"
import { useRouter } from "next/navigation"

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "",
    bio: "",
    avatarUrl: "",
  })
  const [editMode, setEditMode] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token")
      if (!token) {
        router.push("/login")
        return
      }

      try {
        const response = await axios.get("/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        setProfile(response.data.profile)
      } catch (error) {
        console.error(error)
      }
    }

    fetchProfile()
  }, [router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const token = localStorage.getItem("token")

    try {
      const response = await axios.put(
        "/profile",
        { ...profile },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      setProfile(response.data.profile)
      setEditMode(false)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl mb-4">Profile</h1>
      {editMode ? (
        <form onSubmit={handleSubmit} className="flex flex-col w-80">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={profile.name}
            onChange={handleChange}
            className="mb-2 p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="bio"
            placeholder="Bio"
            value={profile.bio}
            onChange={handleChange}
            className="mb-2 p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="avatarUrl"
            placeholder="Avatar URL"
            value={profile.avatarUrl}
            onChange={handleChange}
            className="mb-2 p-2 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save
          </button>
        </form>
      ) : (
        <div className="flex flex-col items-center">
          <p className="mb-2">Name: {profile.name}</p>
          <p className="mb-2">Bio: {profile.bio}</p>
          <p className="mb-2">
            Avatar:{" "}
            <img
              src={profile.avatarUrl}
              alt="Avatar"
              className="rounded-full w-32 h-32"
            />
          </p>
          <button
            onClick={() => setEditMode(true)}
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  )
}

export default Profile
