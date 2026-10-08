import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/vue'
import App from './App.vue'
import router from './router'

describe('App.vue', () => {
  it('renders correctly', () => {
    const { container } = render(App, {
      global: {
        plugins: [router]
      }
    })
    expect(container).toBeInTheDocument()
  })
})
