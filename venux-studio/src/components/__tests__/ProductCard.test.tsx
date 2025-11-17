import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ProductCard from "../ProductCard";

describe("ProductCard", () => {
  it("renders name and price and Add button", () => {
    render(<ProductCard id="1" name="Necklace" price={29.9} />);
    expect(screen.getByText(/Necklace/i)).toBeInTheDocument();
    expect(screen.getByText(/R\$ 29.90/)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Adicionar/i })
    ).toBeInTheDocument();
  });
});
