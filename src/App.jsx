import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice';
import { Header, Footer } from './components';
import { Outlet } from 'react-router-dom';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.userData);

  // Fetch current user on app load
  const fetchCurrentUser = () => {
    console.log("userdata", userData);
    authService.getCurrentUser()
      .then(userData => {
        if(userData){
          dispatch(login({ userData }));
        }else {
          dispatch(logout());
        }
      }).catch(error => {
        console.log("Appwrite get current user error:", error);
        throw error;
      }).finally(() => {
        setLoading(false);
      });
  };
  
  
  useEffect(() => {
    fetchCurrentUser();
  }, [dispatch]);
  
  return !loading ? (
    <div className="bg-amber-50 flex flex-col sm:min-h-screen sm:min-w-screen bg-[linear-gradient(to_right,#73737320_1px,transparent_1px),linear-gradient(to_bottom,#73737320_1px,transparent_1px)] bg-[size:30px_30px]">
      <div className="flex flex-col min-h-screen w-full">
        <Header />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App
