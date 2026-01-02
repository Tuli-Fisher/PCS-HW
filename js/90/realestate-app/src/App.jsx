import { NavLink, Outlet } from 'react-router'
import './App.css'

function App() {


  return (
    <>
     <h1> PCS REALESTATE </h1>
     <h2>Buy your dream home with us</h2>
      <NavLink to={'/buy'}>Buy A Home</NavLink> | <NavLink to={'/sell'}>Sell A Home</NavLink>
      <hr />
      <Outlet />
    </>
  )
}

export default App
