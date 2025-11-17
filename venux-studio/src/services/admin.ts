import api from './api'

export const requestUpload = async (filename: string) => {
  const res = await api.post('/uploads', { filename })
  return res.data
}

export const createProduct = async (payload: any) => {
  const res = await api.post('/products', payload)
  return res.data
}

export const updateProduct = async (slug: string, payload: any) => {
  const res = await api.put(`/products/${slug}`, payload)
  return res.data
}

export const getProducts = async (q?: string) => {
  const res = await api.get('/products', { params: { q } })
  return res.data
}

export const getProduct = async (slug: string) => {
  const res = await api.get(`/products/${slug}`)
  return res.data
}
