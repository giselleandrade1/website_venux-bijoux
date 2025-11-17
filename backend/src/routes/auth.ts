import { Router } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const router = Router()

// In memory users for demo only
const users: any[] = []

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body
  if (!email || !password) return res.status(400).json({ error: 'Missing fields' })
  const hash = await bcrypt.hash(password, 10)
  const user = { id: `user_${Date.now()}`, name, email, passwordHash: hash }
  users.push(user)
  const accessToken = jwt.sign({ sub: user.id }, process.env.JWT_SECRET || 'dev', { expiresIn: '15m' })
  const refreshToken = jwt.sign({ sub: user.id }, process.env.JWT_SECRET || 'dev', { expiresIn: '7d' })
  res.status(201).json({ user: { id: user.id, email: user.email }, accessToken, refreshToken })
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  const user = users.find(u => u.email === email)
  if (!user) return res.status(401).json({ error: 'Invalid credentials' })
  const ok = await bcrypt.compare(password, user.passwordHash)
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' })
  const accessToken = jwt.sign({ sub: user.id }, process.env.JWT_SECRET || 'dev', { expiresIn: '15m' })
  const refreshToken = jwt.sign({ sub: user.id }, process.env.JWT_SECRET || 'dev', { expiresIn: '7d' })
  res.json({ user: { id: user.id, email: user.email }, accessToken, refreshToken })
})

export default router
