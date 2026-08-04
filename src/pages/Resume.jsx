import PageTransition from '../layout/PageTransition.jsx'
import { asset } from '../utils/asset.js'
import './Resume.css'

export default function Resume() {
    return (
        <PageTransition>
            <div className="page-wrap" style={{ textAlign: 'center' }}>
                <h1 className="pixel-text">Resume</h1>
                <iframe title="Resume" src={asset('assets/docs/resume.pdf')} className="pdf">
                    <p>
                        Unable to display PDF file.{' '}
                        <a href={asset('assets/docs/resume.pdf')}>Download</a> instead.
                    </p>
                </iframe>
            </div>
        </PageTransition>
    )
}
