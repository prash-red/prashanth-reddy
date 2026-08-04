import { useEffect, useState } from 'react'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion.js'

export default function PageTransition({ children }) {
    const reducedMotion = usePrefersReducedMotion()
    const [entered, setEntered] = useState(reducedMotion)

    useEffect(() => {
        if (reducedMotion) {
            setEntered(true)
            return
        }
        setEntered(false)
        const id = requestAnimationFrame(() => setEntered(true))
        return () => cancelAnimationFrame(id)
    }, [reducedMotion])

    return (
        <div className={`page-enter ${entered ? 'page-enter-active' : ''}`}>
            {children}
        </div>
    )
}
