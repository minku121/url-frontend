
import Home from './components/Home';
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom';
import Login from './components/Login';
import Rdirect from './components/Rdirect';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import Everify from './components/Everify';
import Dashboard from './components/Dashboard';
function App() {
  return (
    <div>
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/*' element={<Rdirect/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/everify' element={<Everify/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
    </Router>
    </div>
  )
}

export default App