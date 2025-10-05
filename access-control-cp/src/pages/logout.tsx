import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useAuth } from "../context/AuthContext";

export default function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    navigate("/login", { replace: true });
  }, [logout, navigate]);

  return (
    <main className="min-h-screen grid place-items-center p-4">
      <Spinner />
    </main>
  );
}