import { useState } from "react";
import { register, type RegisterData } from "../auth";

export const RegisterForm = () => {
  const [form, setForm] = useState<RegisterData>({
    name: "",
    login: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await register(form);
    setMessage(res.detail || "Registered! Check your email for code.");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="login" placeholder="Login" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
      />
      <button type="submit">Register</button>
      <p>{message}</p>
    </form>
  );
};
