import React, { useState } from 'react'
import {Avatar, Button} from "@mui/material"
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link } from 'react-router-dom'
import DeleteOutline from '@mui/icons-material/DeleteOutline';


const Post = ({
    postId, caption, postImage, likes=[], comments=[], ownerImage, ownerId, ownerName, isDelete=false, isAccount=false
}) => {

  const [liked, setLiked]=useState(false)
  const handleLike=()=>{
    setLiked(prevState=>!prevState)
  }
  return (
    <div>
      <div>
        <img src={postImage} alt="Post"/>
        <div>
          <Avatar src={ownerImage} alt="Owner" sx={{height:"3vmax",width:"3vmax"}} />

          <Link to={`/user/${ownerId}`}>
            <h1>{ownerName}</h1>
            <h2>{caption}</h2>
          </Link>
          <button className="cursor-pointer">
            5 Likes
          </button>
        </div>
        <div>
          <Button onClick={handleLike}>
            {liked?<ThumbUpIcon/>:<ThumbUpOutlinedIcon/>}  
          </Button>

          <Button>
            <ChatBubbleOutlineIcon/>
          </Button>

          {isDelete&&<Button>
            <DeleteOutline/>
          </Button>}
        </div>
      </div>
    </div>
  )
}

export default Post