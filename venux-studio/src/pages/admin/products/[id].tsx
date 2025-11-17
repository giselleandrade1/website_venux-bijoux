import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import MainLayout from "../../../layouts/MainLayout";
import {
  getProduct,
  createProduct,
  updateProduct,
} from "../../../services/admin";
import AdminImageUploader from "../../../components/AdminImageUploader";
import AdminGuard from "../../../components/AdminGuard";
import styled from "styled-components";

const Container = styled.div`
  padding: 24px;
  max-width: 900px;
`;

const Field = styled.div`
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
`;

const PreviewRow = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
`;

const PreviewImg = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
`;

const Actions = styled.div`
  margin-top: 12px;
`;

const Error = styled.div`
  color: red;
  margin-top: 8px;
`;

const Editor: React.FC = () => {
  const router = useRouter();
  const { id } = router.query as { id?: string };
  const [product, setProduct] = useState<any>({
    title: "",
    price: 0,
    slug: "",
    description: "",
    images: [],
    hasPendant: false,
  });
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    if (!id || id === "new") return;
    getProduct(String(id)).then((res: any) => setProduct(res));
  }, [id]);

  const handleUpload = (url: string) =>
    setProduct((p: any) => ({ ...p, images: [...(p.images || []), url] }));

  const validate = () => {
    const errs: string[] = [];
    if (!product.title || product.title.trim().length < 3)
      errs.push("Título é obrigatório e deve ter ao menos 3 caracteres");
    if (!product.slug || product.slug.trim().length === 0)
      errs.push("Slug é obrigatório");
    if (Number(product.price) <= 0) errs.push("Preço deve ser maior que zero");
    setErrors(errs);
    return errs.length === 0;
  };

  const save = async () => {
    if (!validate()) return;
    try {
      if (id === "new") {
        await createProduct(product);
      } else {
        await updateProduct(String(id), product);
      }
      router.push("/admin/products");
    } catch (err) {
      alert("Erro ao salvar");
    }
  };

  return (
    <AdminGuard>
      <MainLayout>
        <Container>
          <h1>{id === "new" ? "Novo produto" : "Editar produto"}</h1>
          <Field>
            <label htmlFor="title">Título</label>
            <input
              id="title"
              placeholder="Título do produto"
              value={product.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setProduct({ ...product, title: e.target.value })
              }
            />
          </Field>
          <Field>
            <label htmlFor="slug">Slug</label>
            <input
              id="slug"
              placeholder="Identificador único (ex: colar-de-pérolas)"
              value={product.slug}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setProduct({ ...product, slug: e.target.value })
              }
            />
          </Field>
          <Field>
            <label htmlFor="price">Preço</label>
            <input
              id="price"
              placeholder="Preço em BRL"
              type="number"
              value={product.price}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setProduct({ ...product, price: Number(e.target.value) })
              }
            />
          </Field>
          <Field>
            <label htmlFor="description">Descrição</label>
            <textarea
              id="description"
              placeholder="Descrição do produto"
              value={product.description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setProduct({ ...product, description: e.target.value })
              }
            />
          </Field>
          <Field>
            <label>Imagens</label>
            <PreviewRow>
              {(product.images || []).map((u: string, i: number) => (
                <PreviewImg
                  key={u}
                  src={u}
                  alt={`Preview da imagem ${i + 1}`}
                />
              ))}
            </PreviewRow>
            <AdminImageUploader
              onUploaded={handleUpload}
              productId={product.id}
            />
          </Field>
          {errors.length > 0 && (
            <Error>
              {errors.map((err: string, i: number) => (
                <div key={i}>{err}</div>
              ))}
            </Error>
          )}
          <Actions>
            <button onClick={save}>Salvar</button>
          </Actions>
        </Container>
      </MainLayout>
    </AdminGuard>
  );
};

export default Editor;
