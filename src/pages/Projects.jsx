import PageTransition from '../layout/PageTransition.jsx'
import { asset } from '../utils/asset.js'
import './Projects.css'

const PROJECTS = [
    {
        title: 'Neural Monte Carlo PDE Solvers',
        subtitle: 'Dynamic Graphics Project, University of Toronto',
        description:
            'Developing neural-accelerated Monte Carlo (walk-on-boundary) solvers for PDEs — Poisson and Helmholtz boundary value problems — in CUDA/C++, alongside a general framework for unbiased inverse rendering from computational sensors using physically accurate volumetric techniques.',
        tags: [
            { label: 'Python', className: 'is-primary', icon: 'python.png' },
            { label: 'C++', className: 'is-warning', icon: 'cpp.svg' },
            { label: 'CUDA', className: 'is-dark', icon: 'nvidia.svg' },
        ],
        github: 'https://github.com/prash-red/helmholtz-mc-cpp',
    },
    {
        title: 'LectureClip',
        subtitle: 'Video RAG Platform — Team Capstone Project',
        description:
            'A video retrieval-augmented generation platform that transcribes uploaded lectures, indexes them as embeddings, and answers natural language questions with citations to the exact segment. Retrieval runs over Aurora PostgreSQL with pgvector for cross-modal text-to-frame search; generation is a RAG endpoint backed by Claude on AWS Bedrock.',
        tags: [
            { label: 'Python', className: 'is-primary', icon: 'python.png' },
            { label: 'AWS', className: 'is-warning', icon: 'aws.svg' },
            { label: 'PostgreSQL', className: 'is-success', icon: 'postgresql.svg', small: true },
            { label: 'Terraform', className: 'is-dark', icon: 'terraform.svg', small: true },
        ],
        github: 'https://github.com/prash-red/LectureClip-App',
    },
    {
        title: 'Rolling Shutter as an IMU',
        subtitle: 'Graduate Computational Imaging Project',
        description:
            'Investigating whether a rolling shutter sensor can act as an implicit IMU: estimating motion fields from rolling shutter distortion with a diffusion model, then solving for camera trajectory via Structure from Motion.',
        tags: [
            { label: 'Python', className: 'is-primary', icon: 'python.png' },
            { label: 'PyTorch', className: 'is-warning', icon: 'pytorch.svg' },
        ],
        github: 'https://github.com/prash-red/rolling-shutter-as-an-imu',
    },
    {
        title: 'GuessWho AI',
        subtitle: 'Python App',
        thumb: 'guesswho.jpg',
        description:
            'A project aimed at exploring different decision tree regression algorithms within the context of the game of Guess Who.',
        tags: [
            { label: 'Python', className: 'is-primary', icon: 'python.png' },
            { label: 'Java', className: 'is-warning', icon: 'java.png' },
        ],
        github: 'https://github.com/nsaroiu/GuessWho',
    },
    {
        title: 'Social Distance Tracker',
        subtitle: 'Python App',
        thumb: 'social-distance.png',
        description:
            'Social Distance Tracker made using AI and CV. Developed using object detection and depth estimation on Nvidia Jetson MCU and Luxonis stereo camera.',
        tags: [
            { label: 'Python', className: 'is-primary', icon: 'python.png' },
            { label: 'OpenCV', className: 'is-warning', icon: 'opencv.png' },
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
                            {project.thumb && (
                                <img
                                    src={asset(`assets/projects/${project.thumb}`)}
                                    className="project-thumb"
                                    alt={project.title}
                                />
                            )}
                            <div className="project-body">
                                <h5 className="project-title">{project.title}</h5>
                                <h6 className="project-subtitle">{project.subtitle}</h6>
                                <p>{project.description}</p>
                                <div className="project-meta">
                                    <div className="project-tags">
                                        {project.tags.map((tag) => (
                                            <div className="nes-badge" key={tag.label}>
                                                <span className={`${tag.className}${tag.small ? ' tag-small' : ''}`}>
                                                    {tag.icon && (
                                                        <img
                                                            src={asset(`assets/icons/skills/${tag.icon}`)}
                                                            height="14"
                                                            alt=""
                                                            className="tag-icon"
                                                        />
                                                    )}
                                                    {tag.label}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                    {project.github && (
                                        <a href={project.github} target="_blank" rel="noreferrer" className="project-github">
                                            <i className="nes-icon github is-medium"></i>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </PageTransition>
    )
}
