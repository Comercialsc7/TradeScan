import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="h-8 w-14 rounded-full bg-slate-200 dark:bg-slate-700" />
    )
  }

  const isDarkMode = resolvedTheme === 'dark'

  const toggleTheme = () => {
    setTheme(isDarkMode ? 'light' : 'dark')
  }

  return (
    <label className="switch">
      <input
        type="checkbox"
        checked={isDarkMode}
        onChange={toggleTheme}
        aria-label="Toggle theme"
      />
      <span className="slider">
        <span className="circle">
          <Sun className="sun h-[18px] w-[18px]" />
          <Moon className="moon h-[18px] w-[18px]" />
        </span>
      </span>
    </label>
  )
}
