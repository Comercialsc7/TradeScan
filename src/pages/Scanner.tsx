import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { X, Zap, Image, VideoOff, Loader2, Keyboard } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCamera } from '@/hooks/useCamera'
import { cn } from '@/lib/utils'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { toast } from '@/components/ui/use-toast'

const ScannerPage = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const {
    stream,
    permissionStatus,
    toggleFlashlight,
    getCameraPermission,
    isFlashlightOn,
  } = useCamera()

  useEffect(() => {
    document.title = 'Escanear Código - TradeScan'
    const originalThemeIsDark =
      document.documentElement.classList.contains('dark')
    document.documentElement.classList.add('dark')

    return () => {
      if (!originalThemeIsDark) {
        document.documentElement.classList.remove('dark')
      }
    }
  }, [])

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream
    }
  }, [stream])

  useEffect(() => {
    if (permissionStatus !== 'granted' || !stream || !videoRef.current) return

    if (!('BarcodeDetector' in window)) {
      toast({
        title: 'Navegador incompatível',
        description:
          'A leitura de código de barras não é suportada neste navegador.',
        variant: 'destructive',
      })
      return
    }

    const barcodeDetector = new (window as any).BarcodeDetector({
      formats: ['ean_13', 'ean_8', 'upc_a', 'upc_e'],
    })

    let intervalId: number

    const detectBarcode = async () => {
      if (videoRef.current && videoRef.current.readyState === 4) {
        try {
          const barcodes = await barcodeDetector.detect(videoRef.current)
          if (barcodes.length > 0) {
            toast({
              title: 'Código de Barras Detectado',
              description: `Valor: ${barcodes[0].rawValue}`,
            })
            clearInterval(intervalId)
          }
        } catch (error) {
          console.error('Barcode detection failed:', error)
        }
      }
    }

    intervalId = window.setInterval(detectBarcode, 500)

    return () => {
      clearInterval(intervalId)
    }
  }, [permissionStatus, stream])

  if (permissionStatus === 'pending') {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-background text-foreground">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p className="mt-4 text-lg">Acessando a câmera...</p>
      </div>
    )
  }

  if (permissionStatus === 'denied') {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-background p-4">
        <Alert variant="destructive" className="max-w-md">
          <VideoOff className="h-4 w-4" />
          <AlertTitle>Acesso à câmera negado</AlertTitle>
          <AlertDescription>
            Você precisa permitir o acesso à câmera para escanear códigos de
            barras.
          </AlertDescription>
        </Alert>
        <div className="mt-6 flex gap-4">
          <Button variant="outline" asChild>
            <Link to="/search-customer">Voltar</Link>
          </Button>
          <Button onClick={getCameraPermission}>Tentar Novamente</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-black font-display">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="absolute left-0 top-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 bg-black/50" />

      <header className="absolute top-0 z-20 flex w-full items-center justify-between p-4 pt-8 sm:p-6">
        <Button
          asChild
          variant="ghost"
          size="icon"
          className="h-12 w-12 rounded-full bg-black/20 text-white transition-colors hover:bg-black/40"
        >
          <Link to="/search-customer" aria-label="Fechar scanner">
            <X className="h-7 w-7" />
          </Link>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            'h-12 w-12 rounded-full bg-black/20 text-white transition-colors hover:bg-black/40',
            { 'text-yellow-400': isFlashlightOn },
          )}
          aria-label="Ativar lanterna"
          onClick={toggleFlashlight}
        >
          <Zap className="h-6 w-6" />
        </Button>
      </header>

      <main className="z-10 flex flex-1 flex-col items-center justify-center text-center">
        <h1 className="pb-6 text-2xl font-bold leading-tight tracking-tight text-white">
          Aponte para o código de barras
        </h1>
        <div className="relative aspect-square w-full max-w-[280px]">
          <div className="absolute -left-1 -top-1 h-12 w-12 border-l-4 border-t-4 border-white" />
          <div className="absolute -right-1 -top-1 h-12 w-12 border-r-4 border-t-4 border-white" />
          <div className="absolute -left-1 -bottom-1 h-12 w-12 border-l-4 border-b-4 border-white" />
          <div className="absolute -right-1 -bottom-1 h-12 w-12 border-r-4 border-b-4 border-white" />
          <div className="absolute left-0 top-0 h-full w-full overflow-hidden">
            <div className="animate-scan-line absolute h-1 w-full bg-primary" />
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
              Enviar da Galeria
            </span>
          </div>
          <div className="flex flex-col items-center gap-2 text-center">
            <Button
              variant="ghost"
              className="h-12 w-12 rounded-full bg-black/40 p-0 text-white transition-colors hover:bg-black/50"
            >
              <Keyboard className="h-6 w-6" />
            </Button>
            <span className="text-sm font-medium text-white">
              Digitar código
            </span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default ScannerPage
