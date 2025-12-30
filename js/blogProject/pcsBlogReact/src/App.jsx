import React from 'react'
import './App.css'
import { useState } from 'react'
import Users from './Users.jsx';


function App() {
  const [page, setPage] = useState('users');

  return (
    <>
      <header>hello world</header>
      <Users/>
      <footer>Pcs 2025</footer>
    </>
  )
}

export default App
