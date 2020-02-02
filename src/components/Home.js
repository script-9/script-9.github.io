import React from 'react'
import Nav from './Nav'

const Home = props => {
  return (
    <>
      <Nav {...props} />
      <div className="Home">
        <h1>Home</h1>
      </div>
    </>
  )
}

export default Home
