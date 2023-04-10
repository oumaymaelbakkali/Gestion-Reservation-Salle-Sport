import logo from './logo.svg';
import './App.css';
import Login from './components/Login'
import Carousel from './components/Carousel'
import Reservation from './components/Reservation'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Admin from './components/Admin'

function App() {
  return (
   <>
   <Router>
   
   <Routes>
   <Route exact path ="/" element ={<Login/>}></Route>
   <Route exact path ="/User" element ={<Carousel/>}></Route>
   <Route exact path ="/Reservation" element ={<Reservation/>}></Route>
   <Route exact path ="/Admin" element ={<Admin/>}></Route>
   </Routes>

   </Router>
   </>
  );
}

export default App;
