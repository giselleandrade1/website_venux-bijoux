import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import MainLayout from '../../../../layouts/MainLayout'
import { getProduct, createProduct, updateProduct } from '../../../../services/admin'
import AdminImageUploader from '../../../../components/AdminImageUploader'

const Editor: React.FC = () => {
  const router = useRouter()
  const { id } = router.query
  const [product, setProduct] = useState<any>({ title: '', price: 0, slug: '', description: '', images: [], hasPendant: false })

  useEffect(() => {
    if (!id || id === 'new') return
    getProduct(String(id)).then((res: any) => setProduct(res))
  }, [id])

  const handleUpload = (url: string) => setProduct((p: any) => ({ ...p, images: [...(p.images || []), url] }))

  const save = async () => {
    try {
      if (id === 'new') {
        await createProduct(product)
      } else {
        await updateProduct(String(id), product)
      }
      router.push('/admin/products')
    } catch (err) {
      alert('Erro ao salvar')
    }
  }

  return (
    <MainLayout>
      <div style={{ padding: 24 }}>
        <h1>{id === 'new' ? 'Novo produto' : 'Editar produto'}</h1>
        <div>
          <label>Título</label>
          <input value={product.title} onChange={e => setProduct({ ...product, title: e.target.value })} />
        </div>
        <div>
          <label>Preço</label>
          <input type="number" value={product.price} onChange={e => setProduct({ ...product, price: Number(e.target.value) })} />
        </div>
        <div>
          <label>Descrição</label>
          <textarea value={product.description} onChange={e => setProduct({ ...product, description: e.target.value })} />
        </div>
        <div>
          <label>Imagens</label>
          <div>
            {(product.images || []).map((u: string) => (
              <img key={u} src={u} alt="preview" style={{ width: 120, height: 120, objectFit: 'cover', marginRight: 8 }} />
            ))}
          </div>
          <AdminImageUploader onUploaded={handleUpload} />
        </div>
        <div style={{ marginTop: 12 }}>
          <button onClick={save}>Salvar</button>
        </div>
      </div>
    </MainLayout>
  )
}

export default Editor
