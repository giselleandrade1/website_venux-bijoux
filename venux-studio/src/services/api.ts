import axios from 'axios'

const api = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api' })

export const getProducts = (q?: string) => api.get('/products', { params: { q } })
export const getProduct = (slug: string) => api.get(`/products/${slug}`)
export default api
