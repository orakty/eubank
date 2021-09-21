import React from 'react'
import 'materialize-css'
import { useRoutes } from './routes';
import {BrowserRouter as Router} from 'react-router-dom'
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/authContext';
//import { Navbar } from './components/Navbar';
import { BottomNavBar } from './components/BottomNavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css'

function App() {
  const {token,login,logout,userId} = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)
  return (
    <AuthContext.Provider 
    value={{token,login,logout,userId,isAuthenticated}}
    >
      <Router>
      {isAuthenticated }
        <div>
          {routes}
        </div>
        <BottomNavBar></BottomNavBar>
      </Router>
     </AuthContext.Provider>
   
  )
}

export default App;
