import PageTransition from '../layout/PageTransition.jsx'
import { asset } from '../utils/asset.js'
import './Projects.css'

const PROJECTS = [
    {
        title: 'GuessWho AI',
        subtitle: 'Python App',
        thumb: 'guesswho.jpg',
        description:
            'A project aimed at exploring different decision tree regression algorithms within the context of the game of Guess Who',
        tags: [
            { label: 'python', className: 'is-primary' },
            { label: 'java', className: 'is-warning' },
        ],
        github: 'https://github.com/nsaroiu/GuessWho',
    },
    {
        title: 'Social Distance Tracker',
        subtitle: 'Python App',
        thumb: 'social-distance.png',
        description:
            'Social Distance Tracker made using AI and CV. Developed using object detection and depth estimation on Nvidia Jetson MCU and Luxonis stereo camera',
        tags: [
            { label: 'python', className: 'is-primary' },
            { label: 'OpenCV', className: 'is-warning' },
        ],
        github: 'https://github.com/prash-red/Social_Distance_Tracker',
    },
]

export default function Projects() {
    return (
        <PageTransition>
            <div className="page-wrap">
                <h1 className="pixel-text">Projects</h1>
                <div className="project-list">
                    {PROJECTS.map((project) => (
                        <div key={project.title} className="project-row hover-jump">
                            <img
                                src={asset(`assets/projects/${project.thumb}`)}
                                className="project-thumb"
                                alt={project.title}
                            />
                            <div className="project-body">
                                <h5 className="project-title">{project.title}</h5>
                                <h6 className="project-subtitle">{project.subtitle}</h6>
                                <p>{project.description}</p>
                                <div className="project-meta">
                                    {project.tags.map((tag) => (
                                        <div className="nes-badge" key={tag.label} style={{ marginRight: '0.75rem' }}>
                                            <span className={tag.className}>{tag.label}</span>
                                        </div>
                                    ))}
                                    <a href={project.github} target="_blank" rel="noreferrer" style={{ marginLeft: 'auto' }}>
                                        <i className="nes-icon github is-medium"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </PageTransition>
    )
}
