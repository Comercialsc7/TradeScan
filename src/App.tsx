import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { ThemeProvider } from '@/components/theme-provider'
import { AuthProvider } from '@/contexts/AuthContext'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import Index from './pages/Index'
import AuthPage from './pages/Auth'
import NotFound from './pages/NotFound'
import Layout from './components/Layout'
import SearchCustomerPage from './pages/SearchCustomer'
import CustomerDetailsPage from './pages/CustomerDetails'
import ScannerPage from './pages/Scanner'
import ManualEntryPage from './pages/ManualEntry'
import ProductDetailsPage from './pages/ProductDetails'

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
            <Route
              path="/customer/:customerId/product/:barcode"
              element={<ProductDetailsPage />}
            />
            <Route path="/" element={<Navigate to="/auth" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
