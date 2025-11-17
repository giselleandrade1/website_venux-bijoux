import React, { useState } from 'react'
import MainLayout from '../../layouts/MainLayout'
import api from '../../services/api'

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await api.post('/auth/login', { email, password })
      // store tokens in localStorage for now
      localStorage.setItem('venux:token', res.data.accessToken)
      window.location.href = '/'
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Erro ao autenticar')
    }
  }

  return (
    <MainLayout>
      <div style={{ padding: 24 }}>
        <h1>Entrar</h1>
        <form onSubmit={submit}>
          <div>
            <label>Email</label>
            <input value={email} onChange={e => setEmail(e.target.value)} type="email" required />
          </div>
          <div>
            <label>Senha</label>
            <input value={password} onChange={e => setPassword(e.target.value)} type="password" required />
          </div>
          {error && <div style={{ color: 'red' }}>{error}</div>}
          <button type="submit">Entrar</button>
        </form>
      </div>
    </MainLayout>
  )
}

export default LoginPage
