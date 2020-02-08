import React from 'react'
import { Link } from '@reach/router'

const NavLink = props => (
  <Link
    {...props}
    getProps={({ location, href }) => {
      const { origin, pathname, search } = location
      return [origin, pathname, search].join('').endsWith(href)
        ? { className: 'active' }
        : null
    }}
  />
)

export default NavLink
