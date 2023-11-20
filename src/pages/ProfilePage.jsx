import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'

const ProfilePage = () => {
  const { user } = useAuthContext()

  return (
    <>
      <h2>{user?.username}</h2>
      <p>{user?.email}</p>
      <p>{user?.id}</p>
      <Link to="/editprofile">Edit Profile</Link>
      <Link to="/changepassword">Change password</Link>
    </>
  )
}

export default ProfilePage
