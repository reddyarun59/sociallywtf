import React, { useEffect } from 'react'
import Post from '../Post/Post'
import { useDispatch } from "react-redux"
import { getFollowingPosts } from '../../Actions/User'

const Home = () => {

  const dispatch =useDispatch()

  useEffect(()=>{
    dispatch(getFollowingPosts())
  })
  return (
    <div>
        <div>
            <Post ownerImage={"https://images.unsplash.com/photo-1654119109097-3094c13fc6ca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=512&q=80"}
            ownerName={"Arun"} caption={"First Post"} postImage={"https://images.unsplash.com/photo-1653050728715-7f1958ab701a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"}  />
        </div>
    </div>
  )
}

export default Home