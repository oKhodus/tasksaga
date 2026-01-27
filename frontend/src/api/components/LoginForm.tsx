import { useState } from "react";
import { login, type LoginData } from "../auth";

export const LoginForm = () => {
  const [form, setForm] = useState<LoginData>({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await login(form);
    if (res.access_token) {
      localStorage.setItem("token", res.access_token);
      setMessage("Logged in!");
    } else {
      setMessage(res.detail || "Error logging in");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
      />
      <button type="submit">Login</button>
      <p>{message}</p>
    </form>
  );
};
