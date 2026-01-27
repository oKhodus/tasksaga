import { useState } from "react";
import { verifyEmail, type VerifyData } from "../auth";

export const VerifyForm = () => {
  const [form, setForm] = useState<VerifyData>({ email: "", code: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await verifyEmail(form);
    setMessage(res.detail || "Verified!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="code" placeholder="Verification Code" onChange={handleChange} />
      <button type="submit">Verify</button>
      <p>{message}</p>
    </form>
  );
};
