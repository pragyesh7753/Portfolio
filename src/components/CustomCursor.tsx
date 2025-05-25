import { useEffect, useState } from 'react'

const EmojiCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isClicking, setIsClicking] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })

      // Check if hovering over interactive elements
      const target = e.target as HTMLElement
      const isInteractive =
        target.matches('a, button, [role="button"], input, select, textarea') ||
        target.closest('a, button, [role="button"], input, select, textarea')
      setIsHovering(!!isInteractive)
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    document.addEventListener('mousemove', updatePosition)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', updatePosition)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  // Only show on desktop devices
  const isDesktop =
    typeof window !== 'undefined' &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches

  if (!isDesktop) return null

  const getEmoji = () => {
    if (isClicking) return '✊'
    if (isHovering) return '👆'
    return '🖐️'
  }

  return (
    <div
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        width: 40,
        height: 40,
        fontSize: 30,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
        userSelect: 'none',
        transform: 'translate(-50%, -50%)',
        zIndex: 9999,
      }}
    >
      {getEmoji()}
    </div>
  )
}

export default EmojiCursor