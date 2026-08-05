import express from 'express'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const app = express()
const PORT = Number(process.env.PORT) || 3001

const currentDirectory = path.dirname(
  fileURLToPath(import.meta.url),
)

const productsFilePath = path.join(
  currentDirectory,
  '../src/data/products.json',
)

const distDirectory = path.join(
  currentDirectory,
  '../dist',
)

app.disable('x-powered-by')

app.get('/api', (_request, response) => {
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
      productsFilePath,
      'utf8',
    )

    const products = JSON.parse(productsFile)

    response.json(products)
  } catch (error) {
    next(error)
  }
})

// Serve the React production files from dist.
app.use(express.static(distDirectory))

// Return React for frontend routes.
app.use((request, response, next) => {
  const isFrontendRequest =
    request.method === 'GET' &&
    !request.path.startsWith('/api')

  if (!isFrontendRequest) {
    next()
    return
  }

  response.sendFile(
    path.join(distDirectory, 'index.html'),
  )
})

app.use((request, response) => {
  response.status(404).json({
    message: `Route ${request.method} ${request.originalUrl} was not found.`,
  })
})

app.use((error, _request, response, _next) => {
  console.error('Server error:', error)

  response.status(500).json({
    message: 'Unable to process the request.',
  })
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(
    `Server running at http://localhost:${PORT}`,
  )
})