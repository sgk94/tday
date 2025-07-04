import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const auth = useAuth();
  const { user, role } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await auth.login(email, password);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  useEffect(() => {
    if (user && role) {
      navigate("/dashboard");
    }
  }, [user, role, navigate]);

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-12 max-w-sm space-y-4 rounded border p-4"
      >
        <h2 className="text-xl font-semibold">Log In</h2>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded border p-2"
          placeholder="Email"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded border p-2"
          placeholder="Password"
        />

        <button
          type="submit"
          className="w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700"
        >
          submit
        </button>
      </form>
    </>
  );
}
