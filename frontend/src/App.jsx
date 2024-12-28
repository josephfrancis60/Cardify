import Layout from './components/Layout'
import Navbar from './components/Navbar'
import Profilegrid from './components/Profilegrid'
import Sidebar from './components/Sidebar'


function App() {

  return (
    <>
     <Layout 
      navbarContent={<Navbar />}
      sidebarContent={<Sidebar />}
      mainContent={<Profilegrid />}
     />
    
    </>
  )
}

export default App
