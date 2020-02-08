import React from 'react'
import Nav from './Nav'
import Shelf from './Shelf'

const Home = props => {
  return (
    <>
      <Nav {...props} />
      <div className="Home">
        <h1>Home</h1>
        {/* <Shelf {...props} /> */}
      </div>
    </>
  )
}

export default Home
