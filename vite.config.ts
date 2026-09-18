import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, loadEnv, type Plugin } from 'vite'
import handler from './api/contact.ts'

function contactApiPlugin(): Plugin {
  return {
    name: 'contact-api-dev-server',
    configureServer(server) {
      server.middlewares.use('/api/contact', async (req, res) => {
        if (req.method === 'OPTIONS') {
          res.writeHead(200, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
          })
          res.end()
          return
        }

        let rawBody = ''
        req.on('data', (chunk) => {
          rawBody += chunk
        })

        req.on('end', async () => {
          let parsedBody = {}
          try {
            parsedBody = rawBody ? JSON.parse(rawBody) : {}
          } catch {
            parsedBody = {}
          }

          const mockReq = {
            method: req.method,
            body: parsedBody
          }

          const mockRes = {
            statusCode: 200,
            setHeader: (k: string, v: string) => res.setHeader(k, v),
            status: function (code: number) {
              this.statusCode = code
              return this
            },
            json: function (data: any) {
              res.writeHead(this.statusCode, { 'Content-Type': 'application/json' })
              res.end(JSON.stringify(data))
            },
            end: () => res.end()
          }

          try {
            await handler(mockReq, mockRes)
          } catch (err: any) {
            console.error('Contact API dev server error:', err)
            res.writeHead(500, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ error: err?.message || 'Server error' }))
          }
        })
      })
    }
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  Object.assign(process.env, env)

  return {
    plugins: [react(), tailwindcss(), contactApiPlugin()]
  }
})

