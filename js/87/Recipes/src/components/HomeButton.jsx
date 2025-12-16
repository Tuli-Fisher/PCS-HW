import React from 'react'

function HomeButton(props) {
  return (
    <button onClick={() => props.setPage('Landing')}>Home</button>
  )
}

export default HomeButton