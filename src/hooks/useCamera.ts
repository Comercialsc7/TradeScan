import { useState, useEffect, useCallback, useRef } from 'react'

type PermissionStatus = 'idle' | 'pending' | 'granted' | 'denied'

export const useCamera = () => {
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [permissionStatus, setPermissionStatus] =
    useState<PermissionStatus>('idle')
  const [error, setError] = useState<Error | null>(null)
  const [isFlashlightOn, setIsFlashlightOn] = useState(false)
  const streamRef = useRef<MediaStream | null>(null)

  useEffect(() => {
    streamRef.current = stream
  }, [stream])

  const stopCamera = useCallback(() => {
    const activeStream = streamRef.current
    if (activeStream) {
      activeStream.getTracks().forEach((track) => track.stop())
    }

    streamRef.current = null
    setStream(null)
    setIsFlashlightOn(false)
    setPermissionStatus('idle')
  }, [])

  const getCameraPermission = useCallback(async () => {
    setPermissionStatus('pending')
    try {
      stopCamera()
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      })
      setStream(mediaStream)
      setPermissionStatus('granted')
    } catch (err) {
      setError(err as Error)
      setPermissionStatus('denied')
    }
  }, [stopCamera])

  const toggleFlashlight = useCallback(async () => {
    if (stream) {
      const videoTrack = stream.getVideoTracks()[0]
      if (!videoTrack) return

      const capabilities = videoTrack.getCapabilities()

      if (capabilities.torch) {
        try {
          const newFlashlightState = !isFlashlightOn
          await videoTrack.applyConstraints({
            advanced: [{ torch: newFlashlightState }],
          })
          setIsFlashlightOn(newFlashlightState)
        } catch (err) {
          console.error('Error toggling flashlight:', err)
        }
      } else {
        console.warn('Flashlight not supported on this device.')
      }
    }
  }, [stream, isFlashlightOn])

  useEffect(() => {
    getCameraPermission()

    return stopCamera
  }, [getCameraPermission, stopCamera])

  return {
    stream,
    permissionStatus,
    error,
    toggleFlashlight,
    getCameraPermission,
    stopCamera,
    isFlashlightOn,
  }
}
