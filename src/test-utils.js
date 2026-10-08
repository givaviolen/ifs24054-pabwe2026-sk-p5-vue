import { render } from '@testing-library/vue'
import { createPinia } from 'pinia'
import router from './router'

export function createMockPinia() {
  return createPinia()
}

export function renderWithProviders(component, options = {}) {
  const pinia = options.pinia || createMockPinia()
  return render(component, {
    global: {
      plugins: [router, pinia],
      ...options.global,
    },
    ...options,
  })
}
