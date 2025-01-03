import { useState } from 'react'
import Layout from './components/Layout'
import Navbar from './components/Navbar'
import Profilegrid from './components/Profilegrid'
import Sidebar from './components/Sidebar'


function App() {

  const [selectedCategory, setSelectedCategory] = useState("All");   // for dynamic heading based on category select

  return (
    <>
     <Layout 
      navbarContent={<Navbar />}
      sidebarContent={<Sidebar 
        selectedCategory = {selectedCategory} 
        setSelectedCategory = {setSelectedCategory} 
      />}
      mainContent={<Profilegrid 
        selectedCategory = {selectedCategory} 
      />}
     />
    
    </>
  )
}

export default App
