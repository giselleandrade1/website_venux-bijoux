import React, { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import api from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";
import styled from "styled-components";

const Container = styled.div`
  padding: 24px;
  max-width: 520px;
`;

const ErrorBox = styled.div`
  color: red;
  margin-top: 8px;
`;

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      login(res.data.accessToken, res.data.refreshToken);
      window.location.href = "/admin/products";
    } catch (err: any) {
      setError(err?.response?.data?.error || "Erro ao autenticar");
    }
  };

  return (
    <MainLayout>
      <Container>
        <h1>Entrar</h1>
        <form onSubmit={submit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              placeholder="seu@email.com"
            />
          </div>
          <div>
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
              placeholder="********"
            />
          </div>
          {error && <ErrorBox>{error}</ErrorBox>}
          <button type="submit">Entrar</button>
        </form>
      </Container>
    </MainLayout>
  );
};

export default LoginPage;
