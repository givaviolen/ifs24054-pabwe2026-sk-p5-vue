import { describe, it, expect } from 'vitest'
import router from './router'

describe('router.js', () => {
  it('should have not-found route', async () => {
    const routes = router.getRoutes()
    const notFound = routes.find(r => r.name === 'not-found')
    expect(notFound).toBeDefined()
    expect(notFound.path).toBe('/:pathMatch(.*)*')
    
    // Call the component import to cover the branch/function
    if (typeof notFound.components.default === 'function') {
      const comp = await notFound.components.default()
      expect(comp).toBeDefined()
    }
  })
})
