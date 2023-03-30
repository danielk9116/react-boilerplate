import React from 'react'
import {Link, NavLink} from 'react-router-dom'

export default function Navbar() {
  return (
    <header>
        <Link className="logo" to="/">Daniel.dev</Link>
        <ul className="primary-navigation">
            <li><NavLink to="/">Home</NavLink></li>
        </ul>
    </header>
  )
}
