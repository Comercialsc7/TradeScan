/* Main App Component - Handles routing (using react-router-dom), query client and other providers - use this file to add all routes */
import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { ThemeProvider } from '@/components/theme-provider'
import Index from './pages/Index'
import AuthPage from './pages/Auth'
import NotFound from './pages/NotFound'
import Layout from './components/Layout'

// ONLY IMPORT AND RENDER WORKING PAGES, NEVER ADD PLACEHOLDER COMPONENTS OR PAGES IN THIS FILE
// AVOID REMOVING ANY CONTEXT PROVIDERS FROM THIS FILE (e.g. TooltipProvider, Toaster, Sonner)

const App = () => {
  useEffect(() => {
    document.documentElement.lang = 'pt-BR'
  }, [])

  return (
    <BrowserRouter
      future={{ v7_startTransition: false, v7_relativeSplatPath: false }}
    >
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        storageKey="payapp-ui-theme"
        disableTransitionOnChange
      >
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route element={<Layout />}>
              <Route path="/auth" element={<AuthPage />} />
              {/* ADD ALL CUSTOM ROUTES MUST BE ADDED HERE */}
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
