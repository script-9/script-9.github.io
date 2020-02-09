import React from 'react'
import Nav from './Nav'
import logo from '../images/logo.png'
import loshermanosbrosgif from '../images/loshermanosbros-lite.gif'
import breakoutgif from '../images/breakout-lite.gif'
import brospipegif from '../images/brospipe-lite.gif'
import livecoding480 from '../images/livecoding480.gif'
import slider480 from '../images/slider480.gif'
import pauserewind from '../images/pauserewind.gif'
import toggle from '../images/toggle.gif'
import spritedemo from '../images/spritedemo.gif'
import mapdemo from '../images/mapdemo.gif'
import musicdemo from '../images/musicdemo.gif'

const Home = props => {
  return (
    <>
      <Nav {...props} />
      <div className="Home">
        <div className="logo-and-timestamp">
          <img src={logo} alt="SCRIPT-8 logo" />
          <span>updated 23:31 01/28/20</span>
          <span>v0.1.280</span>
        </div>
        <section class="intro">
          <p>
            SCRIPT-8 is a fantasy computer for making, sharing, and playing tiny
            retro-looking games (called cassettes). It's free, browser-based,
            and{' '}
            <a href="https://github.com/script-8/script-8.github.io">
              open-source
            </a>
            . Cassettes are written in JavaScript.
          </p>
          <div class="thumbnails">
            <img src={loshermanosbrosgif} alt="Los hermanos bros" />
            <img src={breakoutgif} alt="break-8 game" />
            <img src={brospipegif} alt="the plumber" />
            <img src={breakoutgif} alt="break-8 game" />
            <img src={loshermanosbrosgif} alt="Los hermanos bros" />
            <img src={breakoutgif} alt="break-8 game" />
          </div>
        </section>
        <section>
          SCRIPT-8 is designed to encourage play — the kind of wonder-filled
          play children experience as they explore and learn about the world. In
          order to support this goal, everything in SCRIPT-8 has immediate
          feedback. It is what some call a "livecoding" environment.
        </section>
        <section>It features:</section>
        <section className="feature">
          <p>a code editor where the game changes as you type.</p>
          <img src={livecoding480} alt="livecoding" />
        </section>
        <section className="feature">
          <p>a slider to help you tweak numbers without typing.</p>
          <img src={slider480} alt="slider" />
        </section>
        <section className="feature">
          <p>a time-traveling tool so you can pause and rewind.</p>
          <img src={pauserewind} alt="pause and rewind" />
        </section>
        <section className="feature">
          <p>buttons that show a character's past and future paths.</p>
          <img src={toggle} alt="toggle" />
        </section>
        <section className="feature">
          <p> a sprite editor where the game instantly displays your edits.</p>
          <img src={spritedemo} alt="sprite demo" />
        </section>
        <section className="feature">
          <p>
            a map editor where changes alter the game's behavior, in real-time.
          </p>
          <img src={mapdemo} alt="map demo" />
        </section>
        <section className="feature">
          <p>
            a music editor where you create phrases, group them into chains, and
            turn those into songs.
          </p>
          <img src={musicdemo} alt="music demo" />
        </section>
      </div>
    </>
  )
}

export default Home
