import { useState } from 'react'

export type CartItem = { id: string; name: string; price: number; quantity: number }

export const useCart = () => {
  const [items, setItems] = useState<CartItem[]>([])
  const add = (item: CartItem) => {
    setItems(prev => {
      const found = prev.find(i => i.id === item.id)
      if (found) return prev.map(i => (i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i))
      return [...prev, item]
    })
  }
  const remove = (id: string) => setItems(prev => prev.filter(i => i.id !== id))
  const update = (id: string, qty: number) => setItems(prev => prev.map(i => (i.id === id ? { ...i, quantity: qty } : i)))
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0)
  return { items, add, remove, update, subtotal }
}
