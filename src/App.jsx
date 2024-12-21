import './App.css'
import {Routes ,Route } from 'react-router-dom'

//components
import NavBar from './components/NavBar'
//pages
import Home from './Pages/Home'
import About from './Pages/About'
import ProductDetails from './Pages/ProductDetails'
import SignUp from './Pages/SignUp'
import PageNotFound from './Pages/pageNotFound'



function App() {

  return(
   
<>
 
<NavBar>

</NavBar>

    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path='/detail/:id' element={<ProductDetails/>}/>
      <Route path="/About" element={<About/>}/>
      <Route path='/Sign-Up' element={<SignUp/>}/>
      <Route path="*" element={<PageNotFound />} />
    
    </Routes>
  
</>
)}
//search not-found page
export default App
