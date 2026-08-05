import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import NavBar from './layout/NavBar.jsx'
import Footer from './layout/Footer.jsx'
import Home from './pages/Home.jsx'
import Projects from './pages/Projects.jsx'
import Resume from './pages/Resume.jsx'
import { asset } from './utils/asset.js'

const BACKGROUND_STYLE = {
    backgroundImage: `url(${asset('assets/images/animated.gif')})`,
}

export default function App() {
    return (
        <BrowserRouter basename="/prashanth-reddy">
            <div className="app-background" style={BACKGROUND_STYLE}>
                <NavBar />
                <div className="app-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/projects" element={<Projects />} />
                        <Route path="/resume" element={<Resume />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </div>
                <Footer />
            </div>
        </BrowserRouter>
    )
}
