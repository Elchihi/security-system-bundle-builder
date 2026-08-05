import { readFile } from 'node:fs/promises'

const productsFileUrl = new URL(
  '../src/data/products.json',
  import.meta.url,
)

export default async function handler(
  request,
  response,
) {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET')
    response.status(405).json({
      message: 'Method not allowed.',
    })
    return
  }

  try {
    const productsFile = await readFile(
      productsFileUrl,
      'utf8',
    )

    const products = JSON.parse(productsFile)

    response.status(200).json(products)
  } catch (error) {
    console.error(
      'Vercel products function error:',
      error,
    )

    response.status(500).json({
      message:
        'Unable to load the product catalog.',
    })
  }
}