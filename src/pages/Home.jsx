import PageTransition from '../layout/PageTransition.jsx'
import { asset } from '../utils/asset.js'
import './Home.css'

const EXPERIENCE = [
    {
        date: 'Jan 2026 – Present',
        title: 'Undergraduate Researcher',
        org: 'Dynamic Graphics Project',
        orgLink: 'https://www.dgp.toronto.edu/',
        location: 'University of Toronto, Canada',
    },
    {
        date: 'May 2024 – Aug 2025',
        title: 'Software Development Engineer Co-op',
        org: 'Amazon Robotics',
        orgLink: 'https://amazon.jobs/content/en/teams/ftr',
        location: 'Toronto, Canada',
    },
]

const EDUCATION = [
    {
        date: 'Sept 2022 – Apr 2027',
        title: 'Honours BSc in Computer Science (ASIP Co-op)',
        place: 'University of Toronto, Canada',
    },
]

export default function Home() {
    return (
        <PageTransition>
            <div className="page-wrap">
                <div className="bio-top">
                    <div className="profile-frame">
                        <img
                            src={asset('assets/images/me.jpeg')}
                            className="profile"
                            alt="Prashanth Reddy"
                        />
                    </div>
                    <div className="bio-intro">
                        <h1 className="site-name pixel-text">Prashanth Reddy</h1>
                        <h3 className="site-subtitle">
                            <a href="https://web.cs.toronto.edu/" target="_blank" rel="noreferrer">
                                Computer Science @ University of Toronto '27
                            </a>
                        </h3>
                        <p className="site-institution">
                            Undergraduate Researcher,{' '}
                            <a href="https://www.dgp.toronto.edu/" target="_blank" rel="noreferrer">
                                Dynamic Graphics Project
                            </a>
                        </p>
                        <div className="social-links">
                            <a
                                className="nes-btn is-error"
                                href="https://www.linkedin.com/in/prashanthreddy/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <i className="nes-icon linkedin is-medium"></i>
                            </a>
                            <a
                                className="nes-btn is-success"
                                href="https://github.com/prash-red"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <i className="nes-icon github is-medium"></i>
                            </a>
                            <a
                                className="nes-btn is-primary"
                                href="mailto:shyamalaprashanth2004@gmail.com"
                            >
                                <i className="nes-icon gmail is-medium"></i>
                            </a>
                        </div>
                    </div>
                </div>

                <section className="bio-section">
                    <h2 className="pixel-text">Biography</h2>
                    <p>
                        I'm an Undergraduate Researcher in the{' '}
                        <a href="https://www.dgp.toronto.edu/" target="_blank" rel="noreferrer">
                            Dynamic Graphics Project
                        </a>{' '}
                        at the University of Toronto, where I develop neural-accelerated
                        Monte Carlo solvers for PDEs and unbiased inverse rendering methods
                        for computational sensors. I'm pursuing an Honours BSc in Computer
                        Science (ASIP co-op), graduating in 2027.
                    </p>
                    <p>
                        My interests lie at the intersection of computer graphics,
                        computational imaging, and machine learning — spanning
                        differentiable rendering, neural scene representations, and applied
                        CUDA/GPU programming.
                    </p>
                </section>

                <section className="bio-section">
                    <h2 className="pixel-text">Experience</h2>
                    <ul className="timeline">
                        {EXPERIENCE.map((item) => (
                            <li key={item.title}>
                                <span className="timeline-date">{item.date}</span>
                                <div>
                                    <strong>{item.title}</strong>
                                    <p>
                                        {item.orgLink ? (
                                            <a href={item.orgLink} target="_blank" rel="noreferrer">
                                                {item.org}
                                            </a>
                                        ) : (
                                            item.org
                                        )}
                                        , {item.location}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="bio-section">
                    <h2 className="pixel-text">Education</h2>
                    <ul className="timeline">
                        {EDUCATION.map((item) => (
                            <li key={item.title}>
                                <span className="timeline-date">{item.date}</span>
                                <div>
                                    <strong>{item.title}</strong>
                                    <p>{item.place}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
        </PageTransition>
    )
}
