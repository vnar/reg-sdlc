const GA_MEASUREMENT_ID = 'G-4LY0TDP8DE'

let initialized = false

function canTrack() {
  return typeof window !== 'undefined' && typeof window.gtag === 'function'
}

export function initializeGA() {
  if (!canTrack() || initialized) return
  window.gtag('js', new Date())
  window.gtag('config', GA_MEASUREMENT_ID, { send_page_view: false })
  initialized = true
}

export function trackPageView(path) {
  if (!canTrack()) return
  window.gtag('event', 'page_view', {
    page_title: document.title,
    page_location: window.location.href,
    page_path: path,
  })
}

export function trackEvent(name, params = {}) {
  if (!canTrack()) return
  window.gtag('event', name, params)
}
