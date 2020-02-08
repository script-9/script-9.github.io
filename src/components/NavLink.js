import React from 'react'
import { Link } from '@reach/router'

const NavLink = props => (
  <Link
    {...props}
    getProps={({ location, href }) =>
      location.href.includes(href) ? { className: 'active' } : null
    }
  />
)

export default NavLink
