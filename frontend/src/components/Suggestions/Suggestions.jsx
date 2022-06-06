import React from 'react'
import { Link } from 'react-router-dom'

const Suggestions = () => {
  return (
    <div>
        <div>
            <h1>Suggestions</h1>
        </div>
        <div>
            <Link to={"/user/${userId}"}>
                <img src="https://images.unsplash.com/photo-1654469264927-47d2d02604f2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=50&q=10" alt="random" className="rounded-full"/>
                <h1>Name</h1>
            </Link>
        </div>
    </div>
  )
}

export default Suggestions