import React from "react";
import Image from "next/image";
import "../../design-system/design-tokens.css";

export type Product = {
  id: string;
  name: string;
  price: number;
  thumbnail?: string;
  tags?: string[];
};

type ProductCardProps = {
  product: Product;
  onConfigure?: (id: string) => void;
  onAddToCart?: (id: string) => void;
};

export default function ProductCard({
  product,
  onConfigure,
  onAddToCart,
}: ProductCardProps) {
  return (
    <article
      className="card product"
      role="article"
      aria-labelledby={`product-title-${product.id}`}
    >
      <div
        className="image-wrap"
        role="img"
        aria-label={`Imagem de ${product.name}`}
      >
        <Image
          src={product.thumbnail || "/imagens/placeholder-product.png"}
          alt={product.name}
          width={400}
          height={260}
          className="product-img"
        />
      </div>

      <div className="meta">
        <div>
          <h3 id={`product-title-${product.id}`} className="name">
            {product.name}
          </h3>
          {product.tags?.length ? (
            <div className="tag">{product.tags.join(" • ")}</div>
          ) : null}
        </div>
        <div className="price">
          R$ {product.price.toFixed(2).replace(".", ",")}
        </div>
      </div>

      <div className="actions">
        <button
          className="btn btn-outline"
          aria-label={`Configurar ${product.name}`}
          onClick={() => onConfigure?.(product.id)}
        >
          Configurar
        </button>
        <button
          className="btn btn-primary"
          aria-label={`Adicionar ${product.name} ao carrinho`}
          onClick={() => onAddToCart?.(product.id)}
        >
          Adicionar
        </button>
      </div>
    </article>
  );
}
