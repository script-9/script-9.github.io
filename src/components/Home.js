import React from 'react'
import Nav from './Nav'
import logo from '../images/logo.png'
import tanksgif from '../images/tanks.gif'
import bombgif from '../images/8bomb.gif'
import dungeongif from '../images/dungeon.gif'
import porklikegif from '../images/porklike.gif'
import suppliesgif from '../images/supplies.gif'
import loshermanosbrosgif from '../images/loshermanosbros-lite.gif'
import livecoding480 from '../images/livecoding480.gif'
import slider480 from '../images/slider480.gif'
import pauserewind from '../images/pauserewind.gif'
import toggle from '../images/toggle.gif'
import spritedemo from '../images/spritedemo.gif'
import mapdemo from '../images/mapdemo.gif'
import musicdemo from '../images/musicdemo.gif'

const Home = props => {
  const { version, timestamp } = props
  return (
    <>
      <Nav {...props} />
      <div className="Home">
        <h1>SCRIPT-8</h1>
        <div className="logo-and-timestamp">
          <img src={logo} alt="SCRIPT-8 logo" />
          <span>updated {timestamp}</span>
          <span>v{version}</span>
        </div>
        <p>
          (NOTICE: You're looking at the beta version. This is where I test new
          features. Go to <a href="https://script-8.github.io">SCRIPT-8</a> for
          the full experience.)
        </p>
        <p>
          SCRIPT-8 is a fantasy computer for making, sharing, and playing tiny
          retro-looking games (called cassettes). It's free, browser-based, and{' '}
          <a href="https://github.com/script-8/script-8.github.io">
            open-source
          </a>
          . Cassettes are written in JavaScript.
        </p>
        <p className="thumbnails">
          <img src={loshermanosbrosgif} alt="Los hermanos bros game gif" />
          <img src={bombgif} alt="8-bomb game gif" />
          <img src={dungeongif} alt="dungeon game gif" />
          <img src={tanksgif} alt="tanks game gif" />
          <img src={suppliesgif} alt="supplies game gif" />
          <img src={porklikegif} alt="porklike game gif" />
        </p>
        <p>
          SCRIPT-8 is designed to encourage play — the kind of wonder-filled
          play children experience as they explore and learn about the world. In
          order to support this goal, everything in SCRIPT-8 has immediate
          feedback. It is what some call a "livecoding" environment.
        </p>
        <p>It features:</p>
        <p className="feature">
          <span>a code editor where the game changes as you type.</span>
          <img src={livecoding480} alt="livecoding" />
        </p>
        <p className="feature">
          <span>a slider to help you tweak numbers without typing.</span>
          <img src={slider480} alt="slider" />
        </p>
        <p className="feature">
          <span>a time-traveling tool so you can pause and rewind.</span>
          <img src={pauserewind} alt="pause and rewind" />
        </p>
        <p className="feature">
          <span>buttons that show a character's past and future paths.</span>
          <img src={toggle} alt="toggle" />
        </p>
        <p className="feature">
          <span>
            a sprite editor where the game instantly displays your edits.
          </span>
          <img src={spritedemo} alt="sprite demo" />
        </p>
        <p className="feature">
          <span>
            a map editor where changes alter the game's behavior, in real-time.
          </span>
          <img src={mapdemo} alt="map demo" />
        </p>
        <p className="feature">
          <span>
            a music editor where you create phrases, group them into chains, and
            turn those into songs.
          </span>
          <img src={musicdemo} alt="music demo" />
        </p>
        <p>Each cassette is recorded to a URL you can share with anyone.</p>
        <p>Play cassettes with a keyboard or gamepad.</p>
        <p>
          You can inspect any cassette's contents (even if it's not yours),
          change the code, art, or music, and record it to a different cassette
          — a new version.
        </p>
        <p>
          SCRIPT-8 is heavily influenced by Bret Victor's ideas (specifically{' '}
          <a href="http://vimeo.com/36579366">Inventing on principle</a> and{' '}
          <a
            className="text"
            href="http://worrydream.com/LearnableProgramming/"
          >
            Learnable programming
          </a>
          ) and Joseph White's{' '}
          <a href="https://www.lexaloffle.com/pico-8.php">PICO-8</a>, the best
          of all fantasy consoles.
        </p>
        <p>
          SCRIPT-8 is written by Gabriel Florit (that's me!) and{' '}
          <a
            className="text"
            href="https://github.com/script-8/script-8.github.io/graphs/contributors"
          >
            dedicated contributors
          </a>
          . Click{' '}
          <a href="https://twitter.com/gabrielflorit">
            https://twitter.com/gabrielflorit
          </a>{' '}
          to follow me on twitter. And visit the Github repository,{' '}
          <a
            className="text"
            href="https://github.com/script-8/script-8.github.io"
          >
            https://github.com/script-8/script-8.github.io
          </a>
          , where you can keep up with new features and the occasional bug fix.
        </p>
        <p>
          If you have any questions, come join us on the{' '}
          <a href="https://discord.gg/HA68FNX">
            Fantasy Consoles Discord server
          </a>
          , a friendly place to chat about these sophisticated, cutting-edge
          computers. The server has a dedicated SCRIPT-8 room.
        </p>
        <p>
          SCRIPT-8 nyx8 palette by{' '}
          <a href="https://twitter.com/Xavier_Gd">Javier Guerrero</a>. Sprites
          in{' '}
          <a
            className="text"
            href="https://script-8.github.io/?id=cd8d6811adb3afb472aaf7505729cf01"
          >
            Los Hermanos Bros.
          </a>{' '}
          by <a href="https://twitter.com/johanvinet">Johan Vinet</a>.
        </p>
      </div>
    </>
  )
}

export default Home
