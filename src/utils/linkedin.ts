import { LINKEDIN_APP_URL, LINKEDIN_WEB_URL } from '../config/social'

const MOBILE_UA_REGEX =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone/i

const isMobileDevice = () => MOBILE_UA_REGEX.test(navigator.userAgent)

/**
 * Opens LinkedIn profile with app-first behavior on mobile.
 * Falls back to web profile if the app is unavailable.
 */
export function openLinkedInProfile() {
  if (typeof window === 'undefined') return

  if (!isMobileDevice()) {
    window.open(LINKEDIN_WEB_URL, '_blank', 'noopener,noreferrer')
    return
  }

  let cancelled = false
  const cancelFallback = () => {
    cancelled = true
    cleanup()
  }
  const cleanup = () => {
    document.removeEventListener('visibilitychange', onVisibilityChange)
    window.removeEventListener('pagehide', cancelFallback)
  }
  const onVisibilityChange = () => {
    if (document.visibilityState === 'hidden') cancelFallback()
  }

  document.addEventListener('visibilitychange', onVisibilityChange)
  window.addEventListener('pagehide', cancelFallback, { once: true })

  const fallbackTimer = window.setTimeout(() => {
    cleanup()
    if (!cancelled) {
      window.location.href = LINKEDIN_WEB_URL
    }
  }, 1300)

  window.location.href = LINKEDIN_APP_URL

  window.setTimeout(() => {
    if (!cancelled) window.clearTimeout(fallbackTimer)
  }, 1500)
}
