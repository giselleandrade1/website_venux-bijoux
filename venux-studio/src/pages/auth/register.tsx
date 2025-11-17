import React, { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import api from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";
import styled from "styled-components";

const Container = styled.div`
  padding: 24px;
  max-width: 520px;
`;

const Field = styled.div`
  margin-bottom: 12px;
  label {
    display: block;
    margin-bottom: 6px;
    font-weight: 600;
  }
  input {
    width: 100%;
    padding: 8px;
    border-radius: 6px;
    border: 1px solid var(--color-border, #ddd);
  }
`;

const ErrorBox = styled.div`
  color: red;
  margin-top: 8px;
`;

const RegisterPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);

  const { login } = useAuth();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) return setError("Senhas não coincidem");
    try {
      const res = await api.post("/auth/register", { name, email, password });
      login(res.data.accessToken, res.data.refreshToken);
      window.location.href = "/";
    } catch (err: any) {
      setError(err?.response?.data?.error || "Erro no cadastro");
    }
  };

  return (
    <MainLayout>
      <Container>
        <h1>Cadastro</h1>
        <form onSubmit={submit}>
          <Field>
            <label htmlFor="name">Nome completo</label>
            <input
              id="name"
              name="name"
              title="Nome completo"
              placeholder="Seu nome completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Field>
          <Field>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              title="Email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
            />
          </Field>
          <Field>
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              name="password"
              title="Senha"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
            />
          </Field>
          <Field>
            <label htmlFor="confirm">Confirmar senha</label>
            <input
              id="confirm"
              name="confirm"
              title="Confirmar senha"
              placeholder="Repita a senha"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              type="password"
              required
            />
          </Field>
          {error && <ErrorBox role="alert">{error}</ErrorBox>}
          <button type="submit">Criar conta</button>
        </form>
      </Container>
    </MainLayout>
  );
};

export default RegisterPage;
