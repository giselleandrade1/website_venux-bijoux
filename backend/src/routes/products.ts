import { Router } from 'express'

const router = Router()

const demoProducts = [
  {
    id: 'prod_1',
    title: 'Brinco Lua',
    slug: 'brinco-lua',
    description: 'Brinco delicado para montar com pingente',
    price: 129.9,
    category: 'brinco',
    hasPendant: true,
    images: []
  },
  {
    id: 'prod_2',
    title: 'Colar Jardim',
    slug: 'colar-jardim',
    description: 'Colar em acabamento dourado',
    price: 189.0,
    category: 'colar',
    hasPendant: false,
    images: []
  }
]

router.get('/', (req, res) => {
  const q = (req.query.q as string) || ''
  const filtered = demoProducts.filter(p => p.title.toLowerCase().includes(q.toLowerCase()) || p.description.toLowerCase().includes(q.toLowerCase()))
  res.json({ data: filtered, meta: { page: 1, limit: 20, total: filtered.length } })
})

router.get('/:slug', (req, res) => {
  const p = demoProducts.find(x => x.slug === req.params.slug)
  if (!p) return res.status(404).json({ error: 'Not found' })
  res.json(p)
})

export default router
