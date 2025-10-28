import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-background-light p-4 dark:bg-background-dark">
      <div className="w-full max-w-md">
        <Outlet />
      </div>
    </main>
  )
}
