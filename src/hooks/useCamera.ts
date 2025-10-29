import { useState, useEffect, useCallback } from 'react'

type PermissionStatus = 'idle' | 'pending' | 'granted' | 'denied'

export const useCamera = () => {
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [permissionStatus, setPermissionStatus] =
    useState<PermissionStatus>('idle')
  const [error, setError] = useState<Error | null>(null)
  const [isFlashlightOn, setIsFlashlightOn] = useState(false)

  const getCameraPermission = useCallback(async () => {
    setPermissionStatus('pending')
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      })
      setStream(mediaStream)
      setPermissionStatus('granted')
    } catch (err) {
      setError(err as Error)
      setPermissionStatus('denied')
    }
  }, [])

  const toggleFlashlight = useCallback(async () => {
    if (stream) {
      const videoTrack = stream.getVideoTracks()[0]
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

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    stream,
    permissionStatus,
    error,
    toggleFlashlight,
    getCameraPermission,
    isFlashlightOn,
  }
}
