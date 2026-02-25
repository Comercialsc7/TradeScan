import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
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
import ProductDetailsPage from './pages/ProductDetails'
import { AuthProvider } from '@/contexts/AuthContext'
import { ProtectedRoute } from '@/components/ProtectedRoute'

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
        <AuthProvider>
          <TooltipProvider>
            <Toaster />

            <Routes>
              <Route element={<Layout />}>
                <Route path="/auth" element={<AuthPage />} />
              </Route>

              <Route element={<ProtectedRoute />}>
                <Route path="/welcome" element={<Index />} />
                <Route path="/search-customer" element={<SearchCustomerPage />} />
                <Route path="/customer/:id" element={<CustomerDetailsPage />} />
                <Route path="/scanner" element={<ScannerPage />} />
                <Route path="/manual-entry" element={<ManualEntryPage />} />
                <Route
                  path="/customer/:customerId/product/:barcode"
                  element={<ProductDetailsPage />}
                />
              </Route>

              <Route path="/" element={<Navigate to="/auth" replace />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
