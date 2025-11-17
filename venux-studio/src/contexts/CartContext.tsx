import React, { createContext, useContext, useReducer, useEffect } from 'react'

type CartItem = { id: string; title: string; price: number; quantity: number; pendantId?: string }

type State = { items: CartItem[] }

type Action =
  | { type: 'ADD'; item: CartItem }
  | { type: 'REMOVE'; id: string }
  | { type: 'UPDATE'; id: string; quantity: number }
  | { type: 'CLEAR' }

const initial: State = { items: [] }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD': {
      const found = state.items.find(i => i.id === action.item.id && i.pendantId === action.item.pendantId)
      if (found) {
        return { items: state.items.map(i => (i.id === action.item.id && i.pendantId === action.item.pendantId ? { ...i, quantity: i.quantity + action.item.quantity } : i)) }
      }
      return { items: [...state.items, action.item] }
    }
    case 'REMOVE':
      return { items: state.items.filter(i => i.id !== action.id) }
    case 'UPDATE':
      return { items: state.items.map(i => (i.id === action.id ? { ...i, quantity: action.quantity } : i)) }
    case 'CLEAR':
      return { items: [] }
    default:
      return state
  }
}

const CartContext = createContext<{
  state: State
  add: (item: CartItem) => void
  remove: (id: string) => void
  update: (id: string, qty: number) => void
  clear: () => void
}>({} as any)

export const CartProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initial, () => {
    try {
      const raw = localStorage.getItem('venux:cart')
      return raw ? JSON.parse(raw) : initial
    } catch {
      return initial
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('venux:cart', JSON.stringify(state))
    } catch {}
  }, [state])

  const add = (item: CartItem) => dispatch({ type: 'ADD', item })
  const remove = (id: string) => dispatch({ type: 'REMOVE', id })
  const update = (id: string, quantity: number) => dispatch({ type: 'UPDATE', id, quantity })
  const clear = () => dispatch({ type: 'CLEAR' })

  return <CartContext.Provider value={{ state, add, remove, update, clear }}>{children}</CartContext.Provider>
}

export const useCartContext = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCartContext must be used within CartProvider')
  return ctx
}
