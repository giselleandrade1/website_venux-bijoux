import { useAuth as useAuthCtx } from "../contexts/AuthContext";

export default function useAuth() {
  return useAuthCtx();
}
