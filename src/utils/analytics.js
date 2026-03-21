let initialized = false

function canTrack() {
  return typeof window !== 'undefined' && typeof window.gtag === 'function'
}

export function initAnalytics() {
  if (!canTrack() || initialized) return
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
