import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function SignUpPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await register(email, password);
      navigate("/dashboard");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Sign Up failed";
      setError(message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-12 max-w-sm space-y-4 rounded border p-4"
    >
      <h2 className="text-xl font-semibold">Create an account</h2>

      <input
        type="email"
        placeholder="Email"
        className="w-full rounded border p-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full rounded border p-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        className="w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700"
      >
        Sign Up
      </button>
    </form>
  );
}
