import React from 'react'
import {useNavigate} from 'react-router-dom'
import logo from "../images/raj-removebg-preview.png"
import { FaSearch } from 'react-icons/fa'
import { FaHeart, FaShoppingCart, FaUser } from 'react-icons/fa'
import "../index.css"

const Header = () => {

  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate('/');
  };

  return (
    <>
      <div className='Header'>

        <div className='Headerlogo'>
          <img src={logo} onClick={handleSubmit} alt="logo" />    
        </div>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search"
          />
          <div className='buttons'>
            <button>
              <FaSearch />
            </button>
          </div>
        </div>

        <div className="favIcon">
          <FaHeart className="icon" />
        </div>

        <div className="ATCicon">
          <FaShoppingCart className="icon" />
        </div>

        <div className="ProfileIcon">
          <FaUser className="icon" />
        </div>

        <nav className="navbar">
          <ul>
            <li onClick={() => navigate('/')}>Home</li>
            <li onClick={() => navigate('/category')}>Category</li>
            <li onClick={() => navigate('/free')}>Free</li>
            <li onClick={() => navigate('/scripts')}>Scripts</li>
            <li onClick={() => navigate('/reviews')}>Reviews</li>
          </ul>
        </nav>

      </div>
    </>
  )
}


export default Header
