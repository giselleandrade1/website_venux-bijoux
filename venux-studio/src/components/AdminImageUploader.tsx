import React, { useState } from "react";
import { requestUpload } from "../services/admin";

export const AdminImageUploader: React.FC<{
  onUploaded: (url: string) => void;
  productId?: string;
}> = ({ onUploaded, productId }) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const r = await requestUpload(file.name);
      const uploadUrl = r.uploadUrl;
      const form = new FormData();
      form.append("file", file);
      if (productId) form.append("productId", productId);
      // upload to the provided uploadUrl (include Authorization header)
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("venux:token")
          : null;
      const headers: any = {};
      if (token) headers["Authorization"] = `Bearer ${token}`;
      await fetch(uploadUrl, { method: "POST", body: form, headers });
      onUploaded(r.publicUrl);
    } catch (err) {
      console.error(err);
      alert("Erro ao enviar imagem");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
      />
      <button onClick={submit} disabled={!file || loading}>
        {loading ? "Enviando..." : "Enviar"}
      </button>
    </div>
  );
};

export default AdminImageUploader;
