import React, { useState } from 'react'
import MainLayout from '../../layouts/MainLayout'
import api from '../../services/api'

const RegisterPage: React.FC = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState<string | null>(null)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirm) return setError('Senhas não coincidem')
    try {
      const res = await api.post('/auth/register', { name, email, password })
      localStorage.setItem('venux:token', res.data.accessToken)
      window.location.href = '/'
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Erro no cadastro')
    }
  }

  return (
    <MainLayout>
      <div style={{ padding: 24 }}>
        <h1>Cadastro</h1>
        <form onSubmit={submit}>
          <div>
            <label>Nome completo</label>
            <input value={name} onChange={e => setName(e.target.value)} required />
          </div>
          <div>
            <label>Email</label>
            <input value={email} onChange={e => setEmail(e.target.value)} type="email" required />
          </div>
          <div>
            <label>Senha</label>
            <input value={password} onChange={e => setPassword(e.target.value)} type="password" required />
          </div>
          <div>
            <label>Confirmar senha</label>
            <input value={confirm} onChange={e => setConfirm(e.target.value)} type="password" required />
          </div>
          {error && <div style={{ color: 'red' }}>{error}</div>}
          <button type="submit">Criar conta</button>
        </form>
      </div>
    </MainLayout>
  )
}

export default RegisterPage
