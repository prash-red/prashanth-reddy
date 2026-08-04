import './Footer.css'

export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="page-wrap footer-inner">
                <span className="footer-copy">© 2026 Prashanth Reddy</span>
                <ul className="footer-links">
                    <li>
                        <a href="https://www.linkedin.com/in/prashanthreddy/" target="_blank" rel="noreferrer">
                            <i className="nes-icon linkedin is-medium"></i>
                        </a>
                    </li>
                    <li>
                        <a href="https://github.com/prash-red" target="_blank" rel="noreferrer">
                            <i className="nes-icon github is-medium"></i>
                        </a>
                    </li>
                </ul>
            </div>
        </footer>
    )
}
