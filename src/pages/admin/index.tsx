import React from "react";
import styled from "styled-components";
import { Header, Footer, ProductCard } from "../../components";

const Main = styled.main`
  padding: 24px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
`;

const AdminIndex: React.FC = () => {
  return (
    <div>
      <Header />
      <Main>
        <h1>Painel Admin</h1>
        <section>
          <h2>Produtos</h2>
          <Grid>
            <ProductCard id="prod_1" name="Brinco Lua" price={129.9} />
            <ProductCard id="prod_2" name="Colar Jardim" price={189.0} />
          </Grid>
        </section>
      </Main>
      <Footer />
    </div>
  );
};

export default AdminIndex;
