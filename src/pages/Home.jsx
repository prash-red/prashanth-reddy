import PageTransition from '../layout/PageTransition.jsx'
import { asset } from '../utils/asset.js'
import './Home.css'

export default function Home() {
    return (
        <PageTransition>
            <div className="page-wrap">
                <div className="bio-top">
                    <img
                        src={asset('assets/images/me.jpeg')}
                        className="profile"
                        alt="Prashanth Reddy"
                    />
                    <div className="bio-intro">
                        <h1 className="site-name pixel-text">Prashanth Reddy</h1>
                        <h3 className="site-subtitle">
                            Computer Science @ University of Toronto '26
                        </h3>
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
                                className="nes-btn is-warning"
                                href={asset('assets/docs/resume.pdf')}
                                target="_blank"
                                rel="noreferrer"
                            >
                                Resume
                            </a>
                        </div>
                    </div>
                </div>
                <ul className="bio-list">
                    <li>
                        <img src={asset('assets/icons/emojis/waving-hand.png')} height="20" alt="" />
                        <p>
                            Hello! I'm Prashanth, a passionate second-year student, eagerly
                            exploring the world of Software Engineering and technology.
                        </p>
                    </li>
                    <li>
                        <img src={asset('assets/icons/emojis/grad-cap.png')} height="20" alt="" />
                        <p>
                            I'm pursuing an HBSc with a Specialist in Computer Science (ASIP
                            co-op), graduating class of 2026.
                        </p>
                    </li>
                    <li>
                        <img src={asset('assets/icons/emojis/man-tech.png')} height="20" alt="" />
                        <p>
                            I've gained valuable experience as a Trading Developer at
                            TradeBeez Brokers in Dubai. Additionally, I contributed as a Mesh
                            Maker Software Developer at Nia Technologies in Toronto,
                            enhancing proprietary software with a user-friendly mesh creation
                            interface.
                        </p>
                    </li>
                    <li>
                        <img src={asset('assets/icons/emojis/rocket.png')} height="20" alt="" />
                        <p>
                            In terms of projects, my work spans diverse areas. I developed a
                            Line Drawing Classifier using TensorFlow, HTML, CSS, and
                            JavaScript, enabling the recognition and classification of line
                            drawings. Another exciting project was "GuessWho AI," a digital
                            version of the Guess Who game featuring an AI opponent, employing
                            decision tree algorithms.
                        </p>
                    </li>
                    <li>
                        <img src={asset('assets/icons/emojis/guitar.png')} height="20" alt="" />
                        <p>
                            Apart from my passion for Software Engineering, I am also deeply
                            intrigued by the intersection of artificial intelligence and
                            math, constantly seeking ways to integrate these fields into my
                            projects and research. Additionally, I have a keen interest in
                            music, especially playing the guitar.
                        </p>
                    </li>
                </ul>
            </div>
        </PageTransition>
    )
}
