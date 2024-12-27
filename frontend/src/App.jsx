import Layout from './components/Layout'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'


function App() {

  return (
    <>
     <Layout 
      navbarContent={<Navbar />}
      sidebarContent={<Sidebar />}
     />
    
    </>
  )
}

export default App
