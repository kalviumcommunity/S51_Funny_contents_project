import { Route,Routes} from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar/Navbar'
// import Landingpage from './components/landingpage'
// import Funny from './components/entity'
import Login from './components/login/Login'
import About from './components/about/about'
import UserData from './components/homefolder/UserData'

function App() {

  return (
    <>
    <Navbar/>
    {/* <Login/> */}
    {/* <UserData/> */}
     <Routes>
      <Route path="/" element={<UserData/>} />
      <Route path="/login" element={<Login/>}/>
      <Route path="/about" element={<About/>}/>
    </Routes>
    </> 
  )
}

export default App
