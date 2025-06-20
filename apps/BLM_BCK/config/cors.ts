import { defineConfig } from '@adonisjs/cors'
import type { HttpContext } from '@adonisjs/core/http'

const corsConfig = defineConfig({
  enabled: true,

  origin: (requestOrigin: string | undefined, ctx: HttpContext) => {
    if (!requestOrigin) return false

    if (requestOrigin === 'http://localhost:5174') {
      return true
    }

    if (requestOrigin === 'http://localhost:5173') {
      return ['GET', 'OPTIONS', 'HEAD'].includes(ctx.request.method())
    }

    return false
  },

  methods: ['GET', 'OPTIONS', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE'],
  headers: true,
  exposeHeaders: [],
  credentials: true,
  maxAge: 90,
})

export default corsConfig
