import React, { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { getProducts } from "../../services/admin";
import Link from "next/link";
import AdminGuard from "../../components/AdminGuard";
import styled from "styled-components";

const Container = styled.div`
  padding: 24px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
`;

const AdminProductsPage: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    getProducts().then((res: any) => setProducts(res.data || res));
  }, []);

  return (
    <AdminGuard>
      <MainLayout>
        <Container>
          <h1>Painel Admin - Produtos</h1>
          <Link href="/admin/products/new">
            <button>Novo produto</button>
          </Link>
          <div style={{ marginTop: 16 }}>
            {products.map((p) => (
              <Row key={p.id}>
                <div>{p.title}</div>
                <div>
                  <Link href={`/admin/products/${p.id}`}>
                    <button>Editar</button>
                  </Link>
                </div>
              </Row>
            ))}
          </div>
        </Container>
      </MainLayout>
    </AdminGuard>
  );
};

export default AdminProductsPage;
