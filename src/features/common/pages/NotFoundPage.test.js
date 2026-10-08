import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/vue'
import NotFoundPage from './NotFoundPage.vue'
import router from '../../../router'

describe('NotFoundPage.vue', () => {
  it('renders 404 message', () => {
    const { getByText } = render(NotFoundPage, {
      global: {
        plugins: [router]
      }
    })
    expect(getByText('404')).toBeInTheDocument()
    expect(getByText('Halaman tidak ditemukan.')).toBeInTheDocument()
    expect(getByText('Kembali ke Beranda')).toBeInTheDocument()
  })
})
