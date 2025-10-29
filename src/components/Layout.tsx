import { Outlet } from 'react-router-dom'
import { ThemeToggle } from '@/components/theme-toggle'

export default function Layout() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center bg-background">
      <div className="absolute right-4 top-4 md:right-8 md:top-8">
        <ThemeToggle />
      </div>
      <main className="flex w-full max-w-4xl flex-1 flex-col p-4 pt-24 sm:p-6 md:p-8">
        <Outlet />
      </main>
    </div>
  )
}
