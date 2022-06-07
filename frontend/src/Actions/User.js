import axios from "axios"

export const loginUser=(email,password) => async(dispatch)=>{

    try {
        
        dispatch({
            type:"LoginRequest"
        })
        
        const {data}=await axios.post("/api/v1/login", 
                {email, password}, 
                {headers: 
                    {'Content-Type': 'application/json'}
                }
            )
        
        dispatch({
            type:"LoginSuccess",
            payload: data
        })

    } catch (error) {
        
        dispatch({
            type:"LoginFailure",
            payload:error
        })
    }
}

export const loadUser=() => async(dispatch)=>{

    try {
        
        dispatch({
            type:"LoadUserRequest"
        })
        
        const {data}=await axios.get("/api/v1/me")
        
        dispatch({
            type:"LoadUserSuccess",
            payload: data
        })

    } catch (error) {
        
        dispatch({
            type:"LoadUserFailure",
            payload:error
        })
    }
}

export const getFollowingPosts = () => async (dispatch) => {
    try {
      dispatch({
        type: "postOfFollowingRequest",
      });
  
      const { data } = await axios.get("/api/v1/posts/");

      dispatch({
        type: "postOfFollowingSuccess",
        payload: data.posts,
      });
    } catch (error) {
      dispatch({
        type: "postOfFollowingFailure",
        payload: error.response.data.message,
      });
    }
  };
  