import './App.css';
import { useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar/Navbar';
import Login from './components/Login/Login';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './Actions/User';
import Home from './components/Home/Home';
import Suggestions from './components/Suggestions/Suggestions';


function App() {
  const dispatch = useDispatch()
  // useEffect(()=>{
  //   dispatch(loadUser())
  // },[])

  const {isAuthenticated}=useSelector(state=>state.user)
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={isAuthenticated?<Home/>:<Login/>} />
        </Routes>
        {isAuthenticated&&<Navbar/>}
        {isAuthenticated&&<Suggestions/>}
      </Router>
    </>
  );
}

export default App;
