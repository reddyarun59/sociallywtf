import React from 'react'
import { Link } from 'react-router-dom'
import { HomeOutlined, AddOutlined, SearchOutlined, AccountCircleOutlined } from '@mui/icons-material'

const Navbar = () => {
  return (
    <div className="navbar flex justify-around sm:flex-col">
        <Link to="/">
            <HomeOutlined/>
            <span className="hidden sm:inline">Feed</span>
        </Link>

        <Link to="/newpost">
            <AddOutlined/>
            <span className="hidden sm:inline">New Post</span>
        </Link>

        <Link to="/search">
            <SearchOutlined/>
            <span className="hidden sm:inline">Search</span>
        </Link>

        <Link to="/account">
            <AccountCircleOutlined/>
            <span className="hidden sm:inline">Profile</span>
        </Link>
    </div>
  )
}

export default Navbar