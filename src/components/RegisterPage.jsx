import React, { useState } from "react";
import { UserPlus, UserRound, Mail, KeyRound, BadgeCheck } from "lucide-react";

export default function RegisterPage({ onRegister, onGoLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({ name, email, password, role });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 lg:px-8 py-10">
      <section className="rounded-[36px] border border-slate-200 bg-white p-7 lg:p-10 shadow-sm">
        <p className="text-xs uppercase tracking-[0.2em] font-bold text-amber-700 mb-3">
          Create Account
        </p>
        <h1 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tight mb-2">
          Register on Uthsawa
        </h1>
        <p className="text-sm text-slate-500 mb-8">
          Frontend-only registration for demo workflows. No backend calls
          involved.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Full Name
            </span>
            <span className="mt-2 flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3">
              <UserRound className="h-4 w-4 text-slate-400" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-transparent text-sm text-slate-700 focus:outline-none"
              />
            </span>
          </label>

          <label className="block">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Email
            </span>
            <span className="mt-2 flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3">
              <Mail className="h-4 w-4 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent text-sm text-slate-700 focus:outline-none"
              />
            </span>
          </label>

          <label className="block">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Password
            </span>
            <span className="mt-2 flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3">
              <KeyRound className="h-4 w-4 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent text-sm text-slate-700 focus:outline-none"
              />
            </span>
          </label>

          <label className="block">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Role
            </span>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700 focus:outline-none"
            >
              <option value="customer">Customer</option>
              <option value="vendor">Vendor</option>
            </select>
          </label>

          {role === "vendor" && (
            <div className="rounded-xl border border-amber-100 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-800 inline-flex items-center gap-2">
              <BadgeCheck className="h-4 w-4" />
              Vendor registrations appear in Admin verification queue.
            </div>
          )}

          <button
            type="submit"
            className="w-full mt-2 rounded-2xl bg-amber-500 text-emerald-950 py-3.5 text-xs uppercase tracking-wider font-extrabold inline-flex items-center justify-center gap-2"
          >
            <UserPlus className="h-4 w-4" />
            Create Demo Account
          </button>
        </form>

        <p className="text-sm text-slate-500 mt-6">
          Already have an account?{" "}
          <button onClick={onGoLogin} className="text-emerald-700 font-bold">
            Go to login
          </button>
        </p>
      </section>
    </div>
  );
}
