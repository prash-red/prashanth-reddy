import PageTransition from '../layout/PageTransition.jsx'
import './Contact.css'

export default function Contact() {
    return (
        <PageTransition>
            <div className="page-wrap">
                <h1 className="pixel-text">Contact</h1>
                <div className="contact-cards">
                    <div className="nes-container is-dark is-centered with-title">
                        <p className="title" style={{ color: 'var(--accent)' }}>Personal</p>
                        <a href="mailto:shyamalaprashanth2004@gmail.com">
                            shyamalaprashanth2004@gmail.com
                        </a>
                    </div>
                    <div className="nes-container is-dark is-centered with-title">
                        <p className="title" style={{ color: '#e6a817' }}>Academic</p>
                        <a href="mailto:prashanth.shyamala@mail.utoronto.ca">
                            prashanth.shyamala@mail.utoronto.ca
                        </a>
                    </div>
                </div>
            </div>
        </PageTransition>
    )
}
