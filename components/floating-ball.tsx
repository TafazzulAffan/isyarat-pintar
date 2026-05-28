'use client'

import { useEffect, useRef, useState } from 'react'

interface FloatingBallProps {
  size?: number
  color?: string
  blur?: number
  opacity?: number
  className?: string
}

interface Position {
  x: number
  y: number
}

interface Velocity {
  vx: number
  vy: number
}

export function FloatingBall({
  size = 120,
  color = '#22d3ee',
  blur = 40,
  opacity = 0.6,
  className = '',
}: FloatingBallProps) {
  const ballRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const positionRef = useRef<Position>({ x: 0, y: 0 })
  const velocityRef = useRef<Velocity>({
    vx: (Math.random() - 0.5) * 400,
    vy: (Math.random() - 0.5) * 400,
  })
  const animationIdRef = useRef<number | null>(null)

  useEffect(() => {
    if (!ballRef.current) return

    // Get parent container
    containerRef.current = ballRef.current.parentElement as HTMLDivElement

    // Initial position
    positionRef.current = {
      x: Math.random() * 200,
      y: Math.random() * 200,
    }

    const animate = () => {
      if (!ballRef.current || !containerRef.current) return

      const container = containerRef.current
      const rect = container.getBoundingClientRect()
      const containerWidth = container.offsetWidth
      const containerHeight = container.offsetHeight

      // Update position
      positionRef.current.x += velocityRef.current.vx * 0.016 // ~60fps
      positionRef.current.y += velocityRef.current.vy * 0.016

      // Bounce off walls (dengan offset untuk ukuran bola)
      if (
        positionRef.current.x - size / 2 <= 0 ||
        positionRef.current.x + size / 2 >= containerWidth
      ) {
        velocityRef.current.vx *= -0.95 // Slightly dampen on bounce
        positionRef.current.x = Math.max(
          size / 2,
          Math.min(containerWidth - size / 2, positionRef.current.x)
        )
      }

      if (
        positionRef.current.y - size / 2 <= 0 ||
        positionRef.current.y + size / 2 >= containerHeight
      ) {
        velocityRef.current.vy *= -0.95
        positionRef.current.y = Math.max(
          size / 2,
          Math.min(containerHeight - size / 2, positionRef.current.y)
        )
      }

      // Apply position
      ballRef.current.style.transform = `translate(${positionRef.current.x - size / 2}px, ${positionRef.current.y - size / 2}px)`

      animationIdRef.current = requestAnimationFrame(animate)
    }

    animationIdRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
    }
  }, [size])

  return (
    <div
      ref={ballRef}
      className={`absolute rounded-full pointer-events-none ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: color,
        filter: `blur(${blur}px)`,
        opacity,
      }}
    />
  )
}
