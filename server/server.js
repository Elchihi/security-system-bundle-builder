import express from 'express'
import { readFile } from 'node:fs/promises'

const app = express()
const PORT = Number(process.env.PORT) || 3001

const productsFileUrl = new URL(
  '../src/data/products.json',
  import.meta.url,
)

app.get('/', (_request, response) => {
  response.json({
    message: 'Security System Bundle Builder API',
    endpoints: {
      health: '/api/health',
      products: '/api/products',
    },
  })
})

app.get('/api/health', (_request, response) => {
  response.json({
    status: 'ok',
  })
})

app.get('/api/products', async (_request, response, next) => {
  try {
    const productsFile = await readFile(
      productsFileUrl,
      'utf8',
    )

    const products = JSON.parse(productsFile)

    response.json(products)
  } catch (error) {
    next(error)
  }
})

app.use((request, response) => {
  response.status(404).json({
    message: `Route ${request.method} ${request.originalUrl} was not found.`,
  })
})

app.use((error, _request, response, _next) => {
  console.error('API error:', error)

  response.status(500).json({
    message: 'Unable to load the product catalog.',
  })
})

app.listen(PORT, () => {
  console.log(
    `API server running at http://localhost:${PORT}`,
  )
})