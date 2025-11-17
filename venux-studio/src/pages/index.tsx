import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { getProducts } from "../services/api";
import ProductGrid from "../components/ProductGrid";
import { useCartContext } from "../contexts/CartContext";

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { add } = useCartContext();

  useEffect(() => {
    setLoading(true);
    getProducts()
      .then((res) => {
        setProducts(
          res.data.map((p: any) => ({
            id: p.id,
            name: p.title,
            price: p.price,
            image: p.images?.[0],
          }))
        );
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <MainLayout>
      <section style={{ padding: 32 }}>
        <h1>Catálogo</h1>
        {loading ? (
          <p>Carregando produtos...</p>
        ) : (
          <ProductGrid
            products={products}
            onAdd={(id) =>
              add({
                id,
                title: products.find((p) => p.id === id)?.name || "",
                price: products.find((p) => p.id === id)?.price || 0,
                quantity: 1,
              })
            }
          />
        )}
      </section>
    </MainLayout>
  );
};

export default HomePage;
