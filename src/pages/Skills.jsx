import PageTransition from '../layout/PageTransition.jsx'
import { asset } from '../utils/asset.js'
import './Skills.css'

const SKILL_GROUPS = [
    {
        title: 'Languages',
        items: [
            { icon: 'python.png', label: 'python' },
            { icon: 'java.png', label: 'java' },
            { icon: 'html.png', label: 'html' },
            { icon: 'css-3.png', label: 'css' },
            { icon: 'js.png', label: 'javascript' },
            { icon: 'c-sharp.png', label: 'C#' },
        ],
    },
    {
        title: 'Frameworks',
        items: [
            { icon: 'react.png', label: 'ReactJS' },
            { icon: 'node.png', label: 'NodeJS' },
            { icon: 'express.png', label: 'ExpressJS' },
            { icon: 'flask.png', label: 'flask' },
            { icon: 'bootstrap.png', label: 'bootstrap' },
            { icon: 'opencv.png', label: 'Opencv' },
        ],
    },
    {
        title: 'Databases',
        items: [
            { icon: 'sql.png', label: 'MySQL' },
            { icon: 'mongo.png', label: 'MongoDB' },
            { icon: 'firebase.png', label: 'Firebase' },
        ],
    },
    {
        title: 'Other Tools',
        items: [
            { icon: 'git.png', label: 'Git' },
            { icon: 'unity.jpg', label: 'Unity' },
            { icon: 'latex.png', label: 'latex' },
            { icon: 'vscode.png', label: 'VS Code' },
        ],
    },
]

export default function Skills() {
    return (
        <PageTransition>
            <div className="page-wrap">
                <h1 className="pixel-text">Skills</h1>
                <div className="skills-grid">
                    {SKILL_GROUPS.map((group) => (
                        <div
                            key={group.title}
                            className="nes-container is-dark is-centered with-title skill-sub hover-jump"
                        >
                            <p className="title">{group.title}</p>
                            <ul className="no-bullets">
                                {group.items.map((item) => (
                                    <li key={item.label}>
                                        <div className="skill-item">
                                            <img
                                                src={asset(`assets/icons/skills/${item.icon}`)}
                                                height="20"
                                                alt=""
                                            />
                                            {item.label}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </PageTransition>
    )
}
