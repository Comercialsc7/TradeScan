import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { ThemeToggle } from '@/components/theme-toggle'

export default function Layout() {
  useEffect(() => {
    document.title = 'TradeScan'
  }, [])

  return (
    <>
      <div className="absolute right-4 top-4 md:right-8 md:top-8">
        <ThemeToggle />
      </div>
      <main className="flex min-h-screen w-full items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </main>
    </>
  )
}
