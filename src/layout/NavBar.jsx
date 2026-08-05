import { NavLink } from 'react-router-dom'
import './NavBar.css'

const NAV_LINKS = [
    { to: '/', label: 'About Me', end: true },
    { to: '/projects', label: 'Projects' },
]

export default function NavBar() {
    return (
        <nav className="nav-bar">
            <span className="nav-logo pixel-text">Prashanth Reddy</span>
            <ul className="nav-links">
                {NAV_LINKS.map((link) => (
                    <li key={link.to}>
                        <NavLink
                            to={link.to}
                            end={link.end}
                            className={({ isActive }) =>
                                `nav-link pixel-flicker${isActive ? ' nav-link-active' : ''}`
                            }
                        >
                            {link.label}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
