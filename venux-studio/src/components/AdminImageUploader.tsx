import React, { useState } from 'react'
import { requestUpload } from '../services/admin'

export const AdminImageUploader: React.FC<{ onUploaded: (url: string) => void }> = ({ onUploaded }) => {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  const submit = async () => {
    if (!file) return
    setLoading(true)
    try {
      const r = await requestUpload(file.name)
      const uploadUrl = r.uploadUrl
      const form = new FormData()
      form.append('file', file)
      // upload to the provided uploadUrl
      await fetch(uploadUrl, { method: 'POST', body: form })
      onUploaded(r.publicUrl)
    } catch (err) {
      console.error(err)
      alert('Erro ao enviar imagem')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <input type="file" accept="image/*" onChange={e => setFile(e.target.files ? e.target.files[0] : null)} />
      <button onClick={submit} disabled={!file || loading}>{loading ? 'Enviando...' : 'Enviar'}</button>
    </div>
  )
}

export default AdminImageUploader
