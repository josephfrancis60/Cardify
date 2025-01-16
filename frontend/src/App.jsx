import { useState } from 'react'
import Layout from './components/Layout'
import Navbar from './components/Navbar'
import Profilegrid from './components/Profilegrid'
import Sidebar from './components/Sidebar'


export const BASE_URL = window.location.hostname === "localhost" ? "https://localhost:5000" : "https://cardify-b41a.onrender.com";

function App() {
  const [users, setUsers] = useState([]);


  const [selectedCategory, setSelectedCategory] = useState("All");   // for dynamic heading based on category select

  return (
    <>
     <Layout 
      navbarContent={<Navbar
        setUsers = {setUsers}
        selectedCategory = {selectedCategory}
      />}
      sidebarContent={<Sidebar 
        selectedCategory = {selectedCategory} 
        setSelectedCategory = {setSelectedCategory} 
        setUsers = {setUsers}
      />}
      mainContent={<Profilegrid 
        selectedCategory = {selectedCategory} 
        users = {users}
        setUsers = {setUsers}
      />}
     />
    
    </>
  )
}

export default App
