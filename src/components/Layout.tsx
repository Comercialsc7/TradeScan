import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <>
      <main className="flex min-h-screen w-full items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </main>
    </>
  )
}
