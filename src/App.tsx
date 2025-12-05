  import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
  import { AuthProvider, useAuth } from '@/contexts/AuthContext'
  import { Toaster } from '@/components/ui/toaster'
  import { Layout } from '@/components/Layout'
  import AuthPage from '@/pages/Auth'
  import IndexPage from '@/pages/Index'
  import SearchCustomerPage from '@/pages/SearchCustomer'
  import CustomerDetailsPage from '@/pages/CustomerDetails'
  import ScannerPage from '@/pages/Scanner'
  import ProductDetailsPage from '@/pages/ProductDetails'
  import ManualEntryPage from '@/pages/ManualEntry'
  import NotFound from '@/pages/NotFound'
  import { TooltipProvider } from '@/components/ui/tooltip'

  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { session, loading } = useAuth()

    if (loading) {
      return null // Or a loading spinner
    }

    if (!session) {
      return <Navigate to="/auth" replace />
    }

    return <>{children}</>
  }

  const App = () => {
    return (
      <AuthProvider>
        <TooltipProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/auth" element={<AuthPage />} />
              
              <Route element={<Layout />}>
                <Route path="/" element={<ProtectedRoute><IndexPage /></ProtectedRoute>} />
                <Route path="/search-customer" element={<ProtectedRoute><SearchCustomerPage /></ProtectedRoute>} />
                <Route path="/customer/:customerId" element={<ProtectedRoute><CustomerDetailsPage /></ProtectedRoute>} />
                <Route path="/customer/:customerId/product/:barcode" element={<ProtectedRoute><ProductDetailsPage /></ProtectedRoute>} />
                <Route path="/scanner" element={<ProtectedRoute><ScannerPage /></ProtectedRoute>} />
                <Route path="/manual-entry" element={<ProtectedRoute><ManualEntryPage /></ProtectedRoute>} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    )
  }

  export default App
  