/* Main entry point for the application - renders the root React component */
import { createRoot } from 'react-dom/client'
import { registerSW } from 'virtual:pwa-register'
import App from './App.tsx'
import './main.css'

registerSW({
	immediate: true,
})

createRoot(document.getElementById('root')!).render(<App />)
