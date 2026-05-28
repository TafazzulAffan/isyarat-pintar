import { useEffect, useState } from 'react'

/**
 * Animates a numeric string from 0 to its target value.
 * Supports: integers ('127'), floats ('84.7'), fractions ('18/28'),
 * percentages ('82%'), and comma-formatted numbers ('3,240').
 */
export function useCountUp(target: string, duration: number, trigger: boolean): string {
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    if (!trigger) return

    // Fraction format e.g. "18/28"
    const fractionMatch = target.match(/^(\d+)\/(\d+)$/)
    if (fractionMatch) {
      const numeratorTarget = parseInt(fractionMatch[1], 10)
      const denominator = fractionMatch[2]
      let start: number | null = null
      const step = (ts: number) => {
        if (!start) start = ts
        const progress = Math.min((ts - start) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setDisplay(`${Math.floor(eased * numeratorTarget)}/${denominator}`)
        if (progress < 1) requestAnimationFrame(step)
        else setDisplay(target)
      }
      requestAnimationFrame(step)
      return
    }

    const suffix = target.endsWith('%') ? '%' : ''
    const stripped = target.replace(/,/g, '').replace(/%$/, '')
    const numTarget = parseFloat(stripped)
    if (isNaN(numTarget)) { setDisplay(target); return }

    const isFloat = stripped.includes('.')
    const decimals = isFloat ? (stripped.split('.')[1]?.length ?? 1) : 0
    const hasComma = target.includes(',')

    let start: number | null = null
    const step = (ts: number) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = eased * numTarget
      let formatted: string
      if (isFloat) {
        formatted = current.toFixed(decimals)
      } else {
        const int = Math.floor(current)
        formatted = hasComma ? int.toLocaleString() : String(int)
      }
      setDisplay(formatted + suffix)
      if (progress < 1) requestAnimationFrame(step)
      else setDisplay(target)
    }
    requestAnimationFrame(step)
  }, [trigger, target, duration])

  return display
}
