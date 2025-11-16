import React from "react";
import { render, screen } from "@testing-library/react";
import ProductCard from "../src/components/ProductCard";

test("renders product card with name and price", () => {
  const product = { id: "1", name: "Colar Teste", price: 99.9 };
  render(<ProductCard product={product} />);
  expect(screen.getByText(/Colar Teste/i)).toBeInTheDocument();
  expect(screen.getByText(/99,90/)).toBeInTheDocument();
});
