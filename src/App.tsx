/* Main App Component - Handles routing (using react-router-dom), query client and other providers - use this file to add all routes */
import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { ThemeProvider } from '@/components/theme-provider'
import Index from './pages/Index'
import AuthPage from './pages/Auth'
import NotFound from './pages/NotFound'
import Layout from './components/Layout'
import SearchCustomerPage from './pages/SearchCustomer'
import CustomerDetailsPage from './pages/CustomerDetails'
import ScannerPage from './pages/Scanner'
import ManualEntryPage from './pages/ManualEntry'

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
        storageKey="tradescan-ui-theme"
        disableTransitionOnChange
      >
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/welcome" element={<Index />} />
            <Route element={<Layout />}>
              <Route path="/auth" element={<AuthPage />} />
              {/* ADD ALL CUSTOM ROUTES MUST BE ADDED HERE */}
            </Route>
            <Route path="/search-customer" element={<SearchCustomerPage />} />
            <Route path="/customer/:id" element={<CustomerDetailsPage />} />
            <Route path="/scanner" element={<ScannerPage />} />
            <Route path="/manual-entry" element={<ManualEntryPage />} />
            <Route path="/" element={<Navigate to="/auth" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
