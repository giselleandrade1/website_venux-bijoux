import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AdminGuard from "../../components/AdminGuard";
import Link from "next/link";
import {
  listUsers,
  createUserAdmin,
  updateUserRole,
  deleteUserAdmin,
} from "../../services/admin";

type User = { id: string; email: string; name?: string | null; role: string };

const Container = styled.div`
  padding: 20px;
`;

const Form = styled.form`
  display: grid;
  gap: 8px;
  max-width: 480px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  text-align: left;
  padding: 8px;
`;

const Td = styled.td`
  padding: 8px;
`;

const Button = styled.button`
  margin-left: 8px;
`;

const Section = styled.section`
  margin-bottom: 24px;
`;

const AdminUsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    try {
      const data = await listUsers();
      setUsers(data);
    } catch (err) {
      console.error("load users", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!form.email || !form.password)
      return alert("Email and password are required");
    try {
      const u = await createUserAdmin({
        name: form.name || undefined,
        email: form.email,
        password: form.password,
        role: form.role,
      });
      setUsers((s) => [u, ...s]);
      setForm({ name: "", email: "", password: "", role: "user" });
    } catch (err: any) {
      alert(
        err?.response?.data?.error || err?.message || "Could not create user"
      );
    }
  }

  async function handleChangeRole(id: string, nextRole: string) {
    try {
      const u = await updateUserRole(id, nextRole);
      setUsers((s) => s.map((x) => (x.id === id ? u : x)));
    } catch (err) {
      alert("Could not update role");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this user?")) return;
    try {
      await deleteUserAdmin(id);
      setUsers((s) => s.filter((x) => x.id !== id));
    } catch (err) {
      alert("Could not delete user");
    }
  }

  return (
    <AdminGuard>
      <Container>
        <h1>Painel Admin - Usuários</h1>
        <Section>
          <h2>Criar usuário</h2>
          <Form onSubmit={handleCreate}>
            <input
              placeholder="Nome"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
              placeholder="Senha"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <label>
              Papel
              <select
                aria-label="role"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </label>
            <div>
              <button type="submit">Criar</button>
              <Link href="/admin/products">
                <Button as="a">Voltar a produtos</Button>
              </Link>
            </div>
          </Form>
        </Section>

        <section>
          <h2>Lista de usuários</h2>
          {loading ? (
            <div>Carregando...</div>
          ) : (
            <Table>
              <thead>
                <tr>
                  <Th>Email</Th>
                  <Th>Nome</Th>
                  <Th>Papel</Th>
                  <Th>Ações</Th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <Td>{u.email}</Td>
                    <Td>{u.name || "-"}</Td>
                    <Td>{u.role}</Td>
                    <Td>
                      {u.role === "user" ? (
                        <button onClick={() => handleChangeRole(u.id, "admin")}>
                          Promover a admin
                        </button>
                      ) : (
                        <button onClick={() => handleChangeRole(u.id, "user")}>
                          Rebaixar a user
                        </button>
                      )}
                      <Button onClick={() => handleDelete(u.id)}>
                        Excluir
                      </Button>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </section>
      </Container>
    </AdminGuard>
  );
};

export default AdminUsersPage;
