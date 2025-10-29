import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { X, Zap, Image } from 'lucide-react'
import { Button } from '@/components/ui/button'

const ScannerPage = () => {
  useEffect(() => {
    document.title = 'Escanear QR Code - PayApp'
    const originalThemeIsDark =
      document.documentElement.classList.contains('dark')
    document.documentElement.classList.add('dark')

    return () => {
      if (!originalThemeIsDark) {
        document.documentElement.classList.remove('dark')
      }
    }
  }, [])

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-background-dark font-display">
      <div className="absolute inset-0 z-0">
        <img
          src="https://img.usecurling.com/p/800/1200?q=blurry%20abstract%20gradient"
          alt="Background"
          className="h-full w-full object-cover blur-sm brightness-75"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <header className="absolute top-0 z-20 flex w-full items-center justify-between p-4 pt-8 sm:p-6">
        <Button
          asChild
          variant="ghost"
          size="icon"
          className="h-12 w-12 rounded-full bg-black/20 text-white transition-colors hover:bg-black/40"
        >
          <Link to="/search-customer" aria-label="Close scanner">
            <X className="h-7 w-7" />
          </Link>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-12 w-12 rounded-full bg-black/20 text-white transition-colors hover:bg-black/40"
          aria-label="Toggle flashlight"
        >
          <Zap className="h-6 w-6" />
        </Button>
      </header>

      <main className="z-10 flex flex-1 flex-col items-center justify-center text-center">
        <h1 className="pb-6 text-2xl font-bold leading-tight tracking-tight text-white">
          Scan a QR Code to Pay
        </h1>
        <div className="relative aspect-square w-full max-w-[280px]">
          <div className="scanner-border-tl absolute -left-1 -top-1 h-12 w-12 animate-pulse-border border-l-4 border-t-4 border-white" />
          <div className="scanner-border-tr absolute -right-1 -top-1 h-12 w-12 animate-pulse-border border-r-4 border-t-4 border-white" />
          <div className="scanner-border-bl absolute -left-1 -bottom-1 h-12 w-12 animate-pulse-border border-l-4 border-b-4 border-white" />
          <div className="scanner-border-br absolute -right-1 -bottom-1 h-12 w-12 animate-pulse-border border-r-4 border-b-4 border-white" />
          <div className="scanning-line absolute top-0 left-0 h-full w-full overflow-hidden">
            <div className="animate-scan-line absolute h-16 w-full bg-gradient-to-b from-primary/0 to-primary opacity-70" />
          </div>
        </div>
      </main>

      <footer className="z-10 w-full p-6 pb-12">
        <div className="flex items-center justify-around gap-4">
          <div className="flex flex-col items-center gap-2 text-center">
            <Button
              variant="ghost"
              className="h-12 w-12 rounded-full bg-black/40 p-0 text-white transition-colors hover:bg-black/50"
            >
              <Image className="h-6 w-6" />
            </Button>
            <span className="text-sm font-medium text-white">
              Upload from Gallery
            </span>
          </div>
          <Button className="h-14 flex-1 rounded-xl bg-primary px-6 text-base font-bold leading-normal tracking-[0.015em] text-white shadow-lg shadow-primary/30 transition-colors hover:bg-primary/90">
            Show My QR Code
          </Button>
        </div>
      </footer>
    </div>
  )
}

export default ScannerPage
