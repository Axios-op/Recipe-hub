import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import logo from "../images/raj-removebg-preview.png"
import { FaSearch, FaHeart, FaShoppingCart, FaUser } from 'react-icons/fa'
import Like from "./Like"
import "../index.css"
import UserProfile from './UserProfile'

const Header = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [likeListVisible, setLikeListVisible] = useState(false);
  const [userProfileVisible, setUserProfileVisible] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = () => {
    setSearchTerm("");
    navigate('/');
    handleRefreshClick();
  };

  const handleRefreshClick = () => {
    window.location.reload();
    setSearchTerm("");
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const toggleLikeList = () => {
    setLikeListVisible(!likeListVisible);
  };

  const toggleUserProfile = () => {
    setUserProfileVisible(!userProfileVisible)
  }

  return (
    <>
      <div className='Header'>

        <div className='Headerlogo' onClick={() => {  handleSubmit(); }}>
          <img src={logo} alt="logo" />    
        </div>

        <form onSubmit={handleSearch} className="search-bar">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleChange}
          />
          <div className='buttons'>
            <button type='submit'>
              <FaSearch />
            </button>
          </div>
        </form>

        <div className="favIcon" onClick={toggleLikeList}>
          <FaHeart className="icon" />
        </div>

        <div className="ATCicon">
          <FaShoppingCart className="icon" />
        </div>

        <div className="ProfileIcon" onClick={toggleUserProfile}>
          <FaUser className="icon" />
        </div>

        <nav className="navbar">
          <ul>
            <li><Link onClick={() => { handleRefreshClick(); handleSubmit(); }} to="/">Home</Link></li>
            <li><Link onClick={handleRefreshClick} to="/category">Category</Link></li>
            <li><Link onClick={handleRefreshClick} to="/free">Free</Link></li>
            <li><Link onClick={handleRefreshClick} to="/scripts">Scripts</Link></li>
            <li><Link onClick={handleRefreshClick} to="/reviews">Reviews</Link></li>
          </ul>
        </nav>

      </div>

      {likeListVisible && (
        <div className="likeListOverlay">
          <Like />
        </div>
      )}

      {userProfileVisible && (
        <div className="UserProfileOverlay">
          <UserProfile />
        </div>
      )}

    </>
  )
}


export default Header
