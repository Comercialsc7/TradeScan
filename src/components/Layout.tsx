  import { Outlet, Link, useNavigate } from 'react-router-dom'
  import { useAuth } from '@/contexts/AuthContext'
  import { Button } from '@/components/ui/button'
  import { LogOut, User as UserIcon, Home } from 'lucide-react'

  export const Layout = () => {
    const { user, signOut } = useAuth()
    const navigate = useNavigate()

    const handleSignOut = async () => {
      await signOut()
      navigate('/auth')
    }

    if (!user) return <Outlet />

    return (
      <div className="min-h-screen bg-background">
        <header className="border-b bg-card px-6 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-xl font-bold text-primary">
              TradeScan
            </Link>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <UserIcon className="h-4 w-4" />
                <span className="hidden sm:inline">{user.email}</span>
              </div>
              <Button variant="ghost" size="icon" asChild>
                <Link to="/">
                  <Home className="h-5 w-5" />
                  <span className="sr-only">Início</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" onClick={handleSignOut}>
                <LogOut className="h-5 w-5" />
                <span className="sr-only">Sair</span>
              </Button>
            </div>
          </div>
        </header>
        <main className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    )
  }
  