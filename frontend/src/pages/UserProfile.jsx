import React, { useContext, useEffect, useState } from 'react'
import { GoHome } from "react-icons/go";
import { IoBookmarkOutline } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { AuthDataContext } from '../context/AuthContext';
import axios from 'axios';
import '../styles/user-profile.css'
import { UserDataContext } from '../context/UserContext';
import Logo from '../components/Logo';

const UserProfile = () => {
  const navigate = useNavigate()
  const {serverUrl} = useContext(AuthDataContext)
  const {userData, setUserData, getUserData} = useContext(UserDataContext)



  const handleLogout = async () => {
    try {
      const response = await axios.get(`${serverUrl}/api/auth/logout`,
    { withCredentials: true })
    console.log(response.data)
    setUserData("")
    getUserData()
    navigate('/user/login')
  } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='profile_page'>
      <div className='lg'>
        <Logo />
      </div>
      <div className='profile_container'>
      <FaArrowLeft className='back_icon' onClick={()=> navigate("/")}/>
      <div className='profile_content'>
        <div className='profile_img'>
        <img src="https://images.pexels.com/photos/34103372/pexels-photo-34103372.jpeg" alt="" />
      </div>
      <div className='profile_name'>
        <h2>{userData.fullName}</h2>
      </div>
      <button className='logout_button' onClick={handleLogout}>Logout</button>
      </div>

    <ul className='profile_list'>
      <li className='profile_list_item' onClick={()=> navigate("/")}><GoHome /> Home</li>
      <li className='profile_list_item' onClick={()=> navigate("/saved")}><IoBookmarkOutline /> Saved</li>
    </ul>
    </div>
    </div>
  )
}

export default UserProfile