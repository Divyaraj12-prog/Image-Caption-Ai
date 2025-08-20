import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm]     = useState({ username: "", password: "" });
  const [loading, setLoad]  = useState(false);
  const [error, setError]   = useState("");

  const onChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoad(true); setError("");
    try {
      await register(form);
      navigate("/dashboard");
    } catch (err) {
      setError(err?.response?.data?.message || "Registration failed");
    } finally { setLoad(false); }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-8">
        <h1 className="text-2xl font-bold mb-2">Create your account</h1>
        <p className="text-gray-600 mb-6">Start turning images into beautiful captions.</p>

        <form onSubmit={onSubmit} className="space-y-4">
          <input
            name="username"
            value={form.username}
            onChange={onChange}
            placeholder="Username"
            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={onChange}
            placeholder="Password"
            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            disabled={loading}
            className="w-full py-3 rounded-xl bg-purple-600 text-white hover:bg-purple-700 transition disabled:opacity-60"
          >
            {loading ? "Creating…" : "Create Account"}
          </button>
          {error && <p className="text-red-600 text-sm">{error}</p>}
        </form>

        <p className="text-sm text-gray-600 mt-6">
          Already have an account? <Link to="/login" className="text-purple-600 font-medium">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
